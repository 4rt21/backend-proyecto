import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly dbService: DbService) {}
  async findById(id: number): Promise<any> {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    const result = await this.dbService.getPool().query(sql, [id]);

    const rows = result[0] as any[];

    return rows && rows.length > 0 ? rows[0] : null;
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
}
