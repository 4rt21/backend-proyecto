import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PostReportDto } from './dtos/post-report-dto';
import { DbResponse } from 'src/common/interfaces/db-response';
import { QueryError, QueryResult } from 'mysql2';

@Injectable()
export class ReportsRepository {
  constructor(private readonly dbService: DbService) {}

  async getAllReports(status?: string, id?: string) {
    const sql = `SELECT * FROM reports WHERE 1=1
        ${status ? ` AND status = '${status}'` : ''}
        ${id ? ` AND id = '${id}'` : ''}`;
    const [rows] = await this.dbService.getPool().query(sql);
    return rows;
  }

  async getReportById(id: string) {
    const sql = 'SELECT * FROM reports WHERE id = ?';
    const [rows] = await this.dbService.getPool().query(sql, [id]);
    return rows[0];
  }

  async createReport(
    reportDto: PostReportDto,
    file_path: string,
  ): Promise<QueryResult | QueryError> {
    const sql =
      'INSERT INTO reports (title, image, description, created_by, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';

    const params = [
      reportDto.title,
      file_path,
      reportDto.description,
      reportDto.created_by,
      reportDto.status,
    ];

    const [result] = await this.dbService.getPool().query(sql, params);

    return result;
  }

  async findByReportId(id: string) {
    const sql = 'SELECT * FROM reports WHERE id = ?';
    const [rows] = await this.dbService.getPool().query(sql, [id]);
    return rows[0];
  }

  async findByCreatedId(id: string) {
    const sql = 'SELECT * FROM reports WHERE created_by = ?';
    const [rows] = await this.dbService.getPool().query(sql, [id]);
    return rows[0];
  }

}
