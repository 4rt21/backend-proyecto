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

  async updateReportCategory(reportId: number, categoryId: number[]) {
    const sql_delete = 'DELETE FROM report_categories WHERE report_id = ?';

    await this.dbService.getPool().query(sql_delete, [reportId]);

    categoryId.map(async (id) => {
      const sql_insert =
        'INSERT INTO report_categories (report_id, category_id) VALUES (?, ?)';
      await this.dbService.getPool().query(sql_insert, [reportId, id]);
    });

    return { reportId, categoryId };
  }

  async getCategoriesByReportId(reportId: number) {
    const sql = 'SELECT category_id FROM report_categories WHERE report_id = ?';
    const [rows] = await this.dbService.getPool().query(sql, [reportId]);
    return (rows as any[]).map((row) => row.category_id);
  }
}
