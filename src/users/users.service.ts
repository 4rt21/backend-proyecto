import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository, User } from './user.repository';
import { sha256 } from 'src/util/crypto/hash.util';
import { parseArgs } from 'util';
import { CreateUserOptionalDto } from 'src/admin/admin.controller';
import { CreateUserDto } from './user.controller';
import { ImagesService } from 'src/images/images.service';

export type UserDto = {
  email: string;
  name: string;
};

export type partialDto = {
  email?: string;
  password?: string;
  name?: string;
};

const adjectives = ['cool', 'fast', 'smart', 'bright', 'happy'];

function generateCreativeUsername(name: string) {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adj}_${name.toLowerCase().replace(/\s+/g, '')}${randomNum}`;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly imagesService: ImagesService,
  ) {}

  async registerUser(
    email: string,
    name: string,
    password: string,
    role_id: string,
  ): Promise<any> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const username = generateCreativeUsername(name.split(' ')[0]);
    const salt = Math.random().toString(36).substring(2, 15);
    const hashedPassword = sha256(password + salt);

    const user = await this.userRepository.registerUser(
      email,
      name,
      hashedPassword,
      username,
      salt,
      role_id,
    );

    if (!user) {
      throw new Error('User registration failed');
    }

    await this.userRepository.generateUserSettings(user.id);
    const userSettings = await this.userRepository.getUserSettings(user.id);

    const { password: _, ...safeUser } = user;

    return {
      user: safeUser,
      settings: userSettings,
    };
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== sha256(password + user.salt)) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<string> {
    const salt = await this.userRepository.getSaltById(id);

    if (!salt) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const hashedOldPassword = sha256(oldPassword + salt);

    const user = await this.userRepository.findById(id);

    if (!user || user.password !== hashedOldPassword) {
      throw new UnauthorizedException('Invalid old password');
    }

    const hashedNewPassword = sha256(newPassword + salt);

    return this.userRepository.updatePassword(id, hashedNewPassword);
  }

  async partialUpdate(
    id: string,
    dtoUserOptional: CreateUserOptionalDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Id must be a number');
    }
    const userToUpdate = await this.userRepository.findById(id);

    const updates: Partial<CreateUserOptionalDto> = {};

    if (dtoUserOptional.email !== undefined)
      updates.email = dtoUserOptional.email;
    if (dtoUserOptional.name !== undefined) updates.name = dtoUserOptional.name;
    if (dtoUserOptional.username !== undefined)
      updates.username = dtoUserOptional.username;

    if (Object.keys(updates).length === 0 && !file) {
      throw new BadRequestException('No fields provided to update');
    }

    if (updates.email) {
      const existingUser = await this.userRepository.findByEmail(updates.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    if (file) {
      const filepath = await this.imagesService.modifyFile(
        userToUpdate.image_path!,
        file,
      );
      updates.image_path = filepath;
    }

    return this.userRepository.partialUpdate(id, updates);
  }

  async getPostInfo(userId: string) {
    return await this.userRepository.getPostsInfoByUserId(userId);
  }

  async deleteUser(userId: string) {
    return await this.userRepository.deleteUserById(userId);
  }
}
