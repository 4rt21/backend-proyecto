import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PostReportDto } from './dtos/post-report-dto';
import { DbResponse } from 'src/common/interfaces/db-response';
import { QueryError, QueryResult, RowDataPacket } from 'mysql2';
import { IsDateString, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetReportCountDto, GetReportDto } from './dtos/get-report-dto';
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
  @IsString()
  status: string;
}
@Injectable()
export class ReportsRepository {
  constructor(private readonly dbService: DbService) {}

  async getAllReports(status?: string, id?: string) {
    const sql = `SELECT * FROM reports WHERE 1=1
        ${status ? ` AND status = '${status}'` : ''}
        ${id ? ` AND id = '${id}'` : ''}`;
    const [rows] = await this.dbService.getPool().query<RowDataPacket[]>(sql);
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      image: row.image,
      description: row.description,
      created_at: row.created_at,
      updated_at: row.updated_at,
      created_by: row.created_by,
      status: row.status,
    }));
  }

  async getReportById(id: string) {
    const sql = 'SELECT * FROM reports WHERE id = ?';
    const [rows] = await this.dbService.getPool().query(sql, [id]);
    return rows[0];
  }

  async createReport(
    reportDto: PostReportDto,
    key: string,
  ): Promise<QueryResult | QueryError> {
    const sql =
      'INSERT INTO reports (title, image, description, created_by, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';

    const params = [
      reportDto.title,
      key,
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

  async countReports(
    query: GetReportCountDto,
  ): Promise<Record<string, number>> {
    const sql =
      query.status == undefined
        ? 'SELECT COUNT(*) as count FROM reports'
        : 'SELECT COUNT(*) as count FROM reports WHERE status = ?';
    const [rows] = await this.dbService
      .getPool()
      .query<RowDataPacket[]>(sql, [query.status]);
    return { count: rows[0].count as number };
  }
}
