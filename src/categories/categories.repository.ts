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
}
