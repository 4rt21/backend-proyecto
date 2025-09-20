import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { S3Service } from 'src/s3/s3.service';
import { PostReportDto } from './dtos/post-report-dto';
import { ReportsCategoryRepository } from 'src/reports_category/reports-category-repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly s3Service: S3Service,
    private readonly reportsCategoryRepository: ReportsCategoryRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getReports(status?: string, id?: string) {
    if (id) {
      const report = await this.reportsRepository.getReportById(id);
      if (!report) {
        throw new NotFoundException(`Report with ID ${id} not found`);
      }
    }
    return this.reportsRepository.getAllReports(status, id);
  }

  async postReport(
    reportDto: PostReportDto,
    file: Express.Multer.File,
  ): Promise<number> {
    const categoryId = await this.categoriesRepository.findById(
      reportDto.category,
    );

    if (!categoryId) {
      throw new NotFoundException(
        `Category with ID ${reportDto.category} not found`,
      );
    }

    // const key = await this.s3Service.uploadFile(file, 'report-pictures');

    const key = 'test';

    if (!key) {
      throw new HttpException(
        'File upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result: any = await this.reportsRepository.createReport(
      reportDto,
      key,
    );

    if (typeof result === 'object' && 'insertId' in result) {
      return result.insertId;
    }

    throw new HttpException(
      'Report creation failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async postReportCategory(reportId: number, categoryId: number) {
    return this.reportsCategoryRepository.createReportCategory(
      reportId,
      categoryId,
    );
  }
}
