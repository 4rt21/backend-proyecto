import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UpdateCategoryDto } from './dtos/put-categories-dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly dbService: DbService) {}
  async findById(id: number): Promise<any> {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await this.dbService
      .getPool()
      .query<RowDataPacket[]>(sql, [id]);

    return rows && rows.length > 0 ? rows[0] : null;
  }

  async categoryExists(id: number): Promise<boolean> {
    const sql = 'SELECT COUNT(*) as count FROM categories WHERE id = ?';
    const [rows] = await this.dbService
      .getPool()
      .query<RowDataPacket[]>(sql, [id]);
    const count = rows[0]?.count || 0;
    return count > 0;
  }

  async createCategory(name: string, description: string): Promise<any> {
    const sql = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    const [result] = await this.dbService
      .getPool()
      .query(sql, [name, description]);
    return { id: (result as any).insertId, name, description };
  }

  async getCategories(): Promise<any[]> {
    const sql = 'SELECT * FROM categories';
    const [rows] = await this.dbService.getPool().query(sql);
    return rows as any[];
  }

  async updateCategory(body: UpdateCategoryDto): Promise<boolean> {
    let sql = `UPDATE categories SET `;
    const updates: string[] = [];
    const params: any[] = [];

    if (body.name) {
      updates.push(`name = ?`);
      params.push(body.name);
    }

    if (body.description) {
      updates.push(`description = ?`);
      params.push(body.description);
    }

    if (updates.length === 0) {
      throw new Error('No fields to update provided');
    }

    sql += updates.join(', ');
    sql += ` WHERE id = ?`;
    params.push(body.id);

    const [rows] = await this.dbService
      .getPool()
      .query<ResultSetHeader>(sql, params);

    return rows.affectedRows > 0;
  }

  async deleteCategory(id: number): Promise<Record<string, boolean>> {
    const sql = 'DELETE FROM categories WHERE id = ?';
    const [rows] = await this.dbService
      .getPool()
      .query<ResultSetHeader>(sql, [id]);
    return { success: rows.affectedRows > 0 };
  }
}
