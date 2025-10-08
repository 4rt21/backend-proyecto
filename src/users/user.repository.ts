import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserOptionalDto } from 'src/admin/admin.controller';
import { DbService } from 'src/db/db.service';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateSettingsUserDto } from './dtos/update-settings-dto';

export class User {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'user@example.com' })
  email: string;
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @ApiProperty({ example: '55e1ebd3ebe4f1b46a5ccc9866d' })
  password: string;
  @ApiProperty({ example: '432423' })
  salt: string;
  @ApiProperty({ example: '/path/to/image.jpg', required: false })
  image_path?: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: DbService) {}

  async registerUser(
    email: string,
    name: string,
    password: string,
    username: string,
    salt: string,
    role_id: string,
  ): Promise<User | void> {
    const sql = `INSERT INTO users (email, name, password, username,salt, role_id) VALUES (?, ?, ?, ?, ?, ?)`;

    await this.dbService
      .getPool()
      .query(sql, [email, name, password, username, salt, role_id]);

    const user = await this.findByEmail(email);
    return user;
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
    const result = rows as { salt: string }[];

    if (!result[0]) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return result[0].salt;
  }

  async getAllUsers() {
    const query = 'SELECT * FROM users';
    const [rows] = await this.dbService.getPool().query(query);
    return rows;
  }

  async partialUpdate(
    id: string,
    userDto: CreateUserOptionalDto,
  ): Promise<User> {
    const keys = Object.keys(userDto);
    const values = Object.values(userDto);

    const setClause = keys.map((key) => `${key} = ?`).join(', ');

    const query = `
            UPDATE users
            SET ${setClause}
            WHERE id = ?
        `;

    await this.dbService.getPool().query(query, [...values, id]);

    const user = await this.findById(id);
    return user;
  }

  async updatePassword(id: string, newPassword: string): Promise<string> {
    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    const [result] = await this.dbService
      .getPool()
      .query(sql, [newPassword, id]);
    return newPassword;
  }

  async generateUserSettings(id: string): Promise<any> {
    const sql = 'INSERT INTO user_settings (user_id) VALUES (?)';
    return await this.dbService.getPool().query(sql, [id]);
  }

  async getUserSettings(id: string): Promise<any> {
    const sql = 'SELECT * FROM user_settings WHERE user_id = ? LIMIT 1';
    const [rows] = await this.dbService.getPool().query(sql, [id]);
    return rows;
  }

  async updateUserSettings(id: string, settings: UpdateSettingsUserDto): Promise<any> {
    const keys = Object.keys(settings);
    const values = Object.values(settings);

    const setClause = keys.map((key) => `${key} = ?`).join(', ');

    const query = `
            UPDATE user_settings
            SET ${setClause}
            WHERE user_id = ?
        `;

    await this.dbService.getPool().query(query, [...values, id]);

    return this.getUserSettings(id);
  }

  async getPostsInfoByUserId(userId: string): Promise<any> {
    const sql = `
    SELECT s.status   AS info_row,
          COUNT(r.id) AS count
    FROM status s
    LEFT JOIN reports r
          ON r.status_id = s.id
          AND r.created_by = ?
    GROUP BY s.id

    UNION ALL

    SELECT 'total', COUNT(*) 
    FROM reports
    WHERE created_by = ?

    UNION ALL

    SELECT 'protegidas', COUNT(*) 
    FROM upvotes
    WHERE user_id = ?;`;

    const [rows]: any[] = await this.dbService
      .getPool()
      .query(sql, [userId, userId, userId]);

    const result = rows.reduce(
      (acc, row) => {
        acc[row.info_row] = row.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    return result;
  }

  async deleteUserById(userId: string) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [rows] = await this.dbService.getPool().query(sql, [userId]);
    return { status: (rows as any).affectedRows > 0 };
  }

  async getUserCount(): Promise<number> {
    const sql = 'SELECT COUNT(*) AS count FROM users';
    const [rows] = await this.dbService.getPool().query(sql);
    const result = rows as { count: number }[];
    return result[0].count;
  }

  async getUserInfo(id: string) {
    const sql =
      'SELECT us.is_reactions_enabled, us.is_review_enabled, us.is_reports_enabled FROM users u JOIN user_settings us ON u.id = us.user_id WHERE u.id = ? LIMIT 1';
    const [rows] = await this.dbService.getPool().query(sql, [id]);

    return rows[0];
  }
}
