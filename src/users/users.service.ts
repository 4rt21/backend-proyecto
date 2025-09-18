import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository, User } from "./user.repository";
import { sha256 } from "src/util/crypto/hash.util";
import { parseArgs } from "util";
import { DtoUserOptional } from "src/admin/admin.controller";
import { CreateUserDto } from "./user.controller";

export type UserDto = {
    email: string;
    name: string;
}

export type partialDto = {
    email?: string
    password?: string
    name?:string
}

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async registerUser(email: string, name: string, password: string): Promise<UserDto | void> {
        const hashedPassword = sha256(password);
        return this.userRepository.registerUser(email, name, hashedPassword);

    }

    async login(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== await this.changePassword(user.id, password)) {
            throw new UnauthorizedException("Invalid password");
        }
        return user;
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findById(id);
    }

    async getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    async changePassword(id: string, newPassword: string): Promise<string> {
        const salt = await this.userRepository.getSaltById(id);
        return sha256(newPassword + salt);
    }


    async partialUpdate(id: string, dtoUserOptional: DtoUserOptional): Promise<User> {
        if (Object.keys(dtoUserOptional).length === 0) {
            throw new BadRequestException("No fields provided to update");
        }

        if (dtoUserOptional.email) {
            const existingUser = await this.userRepository.findByEmail(dtoUserOptional.email);
            if (existingUser && existingUser.email !== (dtoUserOptional.email)) {
                throw new ConflictException('Email already exists');
            }
        }

        if (dtoUserOptional.password) {
            dtoUserOptional.password = await this.changePassword(id, dtoUserOptional.password)
        }

        return this.userRepository.partialUpdate(id, dtoUserOptional)
    }
}