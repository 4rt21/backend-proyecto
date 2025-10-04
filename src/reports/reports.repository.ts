import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PostReportDto } from './dtos/post-report-dto';
import { DbResponse } from 'src/common/interfaces/db-response';
import { QueryError, QueryResult, RowDataPacket } from 'mysql2';
import { IsDateString, IsInt, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetReportCountDto, GetReportDto } from './dtos/get-report-dto';
import { ReportsCategoryRepository } from 'src/reports_category/reports-category-repository';
export class ReportDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the report' })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Potholes in Main Street',
    description: 'Title of the report',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '/images/reports/potholes.png',
    description: 'Path to the report image',
  })
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Large potholes making driving dangerous.',
    description: 'Description of the report',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2025-09-18T04:55:18.000Z',
    description: 'Date when the report was created',
  })
  @IsDateString()
  created_at: string;

  @ApiProperty({
    example: '2025-09-18T04:55:18.000Z',
    description: 'Date when the report was last updated',
  })
  @IsDateString()
  updated_at: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who created the report',
  })
  @IsInt()
  created_by: number;

  @ApiProperty({
    example: 'pendiente',
    description: 'Current status of the report',
  })
  @IsNumberString()
  status: string;
}
@Injectable()
export class ReportsRepository {
  constructor(
    private readonly dbService: DbService,
    private readonly reportsCategoryRepository: ReportsCategoryRepository,
  ) {}

  async getAllReports(status?: string, id?: string, page?: number) {
    const sql = `SELECT r.id,
         r.title,
         r.image,
         r.description,
         r.created_at,
         r.updated_at,
         r.created_by,
         r.status_id,
         r.report_url, 
         u.name as user_name,
         u.image_path as user_image
        FROM reports r
        JOIN users u ON r.created_by = u.id
        WHERE 1=1
        ${status ? ` AND status_id = '${status}'` : ''}
        ${id ? ` AND id = '${id}'` : ''}
        ${page ? ` LIMIT ${(Number(page) - 1) * 10}, 10` : ''}
        ORDER BY r.created_at ASC
        `;

    const [rows] = await this.dbService.getPool().query<RowDataPacket[]>(sql);
    return Promise.all(
      rows.map(async (row) => ({
        id: row.id,
        title: row.title,
        image: row.image,
        description: row.description,
        created_at: row.created_at,
        updated_at: row.updated_at,
        user_name: row.user_name,
        created_by: row.created_by,
        user_image: row.user_image,
        status: row.status,
        report_url: row.report_url,
        categories:
          await this.reportsCategoryRepository.getCategoriesByReportId(row.id),
      })),
    );
  }

  async getReportById(id: string) {
    const sql = 'SELECT * FROM reports WHERE id = ?';
    const [rows] = await this.dbService.getPool().query(sql, [id]);
    return rows[0];
  }

  async createReport(
    reportDto: PostReportDto,
  ): Promise<QueryResult | QueryError> {
    const sql =
      'INSERT INTO reports (title, image, description, created_by, status_id, created_at, updated_at, report_url) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)';

    const params = [
      reportDto.title,
      reportDto.image,
      reportDto.description,
      reportDto.created_by,
      reportDto.status_id,
      reportDto.report_url,
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

  async countReports(
    query: GetReportCountDto,
  ): Promise<Record<string, number>> {
    const sql =
      query.status_id == undefined
        ? 'SELECT COUNT(*) as count FROM reports'
        : 'SELECT COUNT(*) as count FROM reports WHERE status_id = ?';
    const [rows] = await this.dbService
      .getPool()
      .query<RowDataPacket[]>(sql, [query.status_id]);
    return { count: rows[0].count as number };
  }

  async modifyReport(reportId: string, reportDto: any) {
    const ALLOWED_COLUMNS = [
      'title',
      'description',
      'status',
      'updated_at',
      'image',
      'report_url',
    ];

    const keys = Object.keys(reportDto).filter(
      (key) =>
        ALLOWED_COLUMNS.includes(key) &&
        reportDto[key] !== null &&
        reportDto[key] !== undefined,
    );

    if (keys.length === 0) {
      throw new Error('No valid columns to update');
    }

    const values = keys.map((key) => reportDto[key]);
    const setClause = keys.map((key) => `${key} = ?`).join(', ');

    const query = `
    UPDATE reports
    SET ${setClause}
    WHERE id = ?
  `;

    const params = [...values, reportId];
    const [result] = await this.dbService.getPool().query(query, params);
    return result;
  }

  async deleteReport(id: string): Promise<boolean> {
    const sql = 'DELETE FROM reports WHERE id = ?';
    const [result] = await this.dbService.getPool().query(sql, [id]);
    return (result as any).affectedRows > 0;
  }
}
