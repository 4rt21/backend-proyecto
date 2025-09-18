import { Injectable, NotFoundException } from "@nestjs/common";
import { DtoUserOptional } from "src/admin/admin.controller";
import { DbService } from "src/db/db.service";
import { CreateUserDto } from "./user.controller";
import { ApiProperty } from "@nestjs/swagger";
import { sha256 } from "src/util/crypto/hash.util";

export class User {
    @ApiProperty({example: "1"})
    id: string;
    @ApiProperty({example: 'user@example.com'})
    email: string;
    @ApiProperty({example: 'John Doe'})
    name: string;
    @ApiProperty({example: '55e1ebd3ebe4f1b46a5ccc9866d'})
    password: string;
    @ApiProperty({example: '432423'})
    salt: string;
}

@Injectable()
export class UserRepository{
    constructor(private readonly dbService: DbService) {
    }

    async registerUser(email: string, name: string, password: string): Promise<User | void> {

        const sql = `INSERT INTO users (email, name, password_hash, salt) VALUES (?, ?, ?, ?)`;

        await this.dbService.getPool().query(sql, [
            email,
            name,
            password,
            "testsalt"
        ]);
}

    async findByEmail(email: string): Promise<User> {
        const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [rows] = await this.dbService.getPool().query(sql, [email]);

        const result = rows as User[];
        return result[0];
    }

    async findById(id: string): Promise<User> {
        const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
        const [rows] = await this.dbService.getPool().query(sql, [id]);
        const result = rows as User[];

        if (!result[0]) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return result[0];
    }

    async getSaltById(id: string): Promise<string> {
        const sql = 'SELECT salt FROM users WHERE id = ? LIMIT 1';
        const [rows] = await this.dbService.getPool().query(sql, [id]);
        const result = rows as {salt: string}[];

        if (!result[0]) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return result[0].salt;
    }

    async getAllUsers() {
        const query = "SELECT * FROM users"
        const [rows] = await this.dbService.getPool().query(query);
        return rows;
    }

    async partialUpdate(id: string, userDto: DtoUserOptional): Promise<User> {
        const keys = Object.keys(userDto);
        const values = Object.values(userDto);

        const setClause = keys.map(key => `${key} = ?`).join(", ");

        const query = `
            UPDATE users
            SET ${setClause}
            WHERE id = ?
        `;

        await this.dbService.getPool().query(query, [...values, id]);

        const user = await this.findById(id);
        return user;
        
    }
}
