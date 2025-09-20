import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ReportsCategoryRepository {
  constructor(private readonly dbService: DbService) {}
  async findById(id: number) {
    const [result] = await this.dbService
      .getPool()
      .query('SELECT * FROM report_categories WHERE id = ?', [id]);
    return result[0];
  }

  async createReportCategory(reportId: number, categoryId: number) {
    const sql =
      'INSERT INTO report_categories (report_id, category_id) VALUES (?, ?)';
    const [result] = await this.dbService
      .getPool()
      .query(sql, [reportId, categoryId]);
    return result;
  }
}
