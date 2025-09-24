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
import { GetReportCountDto } from './dtos/get-report-dto';
import { UpdateReportDTO } from './dtos/update-report-dto';
import { ImagesService } from 'src/images/images.service';
@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly s3Service: S3Service,
    private readonly reportsCategoryRepository: ReportsCategoryRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly imagesService: ImagesService,
  ) {}

  async getReports(status?: string, id?: string) {
    const reports = await this.reportsRepository.getAllReports(status, id);

    if (id && reports.length === 0) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    const reportsWithUrls = await Promise.all(
      reports.map(async (report) => ({
        ...report,
        image: await this.s3Service.getPresignedUrl(report.image),
      })),
    );

    return reportsWithUrls;
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

    const key = await this.imagesService.uploadFile(file, 'report-pictures');

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

  async countReports(query: GetReportCountDto) {
    return this.reportsRepository.countReports(query);
  }

  async deleteReport(id: string) {
    const report = await this.reportsRepository.findByReportId(id);

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    await this.imagesService.deleteFile(report.image);

    return this.reportsRepository.deleteReport(id);
  }

  async updateReport(id: string, body: any, file: Express.Multer.File) {
    const report = await this.reportsRepository.findByReportId(id)     
    
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    await this.imagesService.modifyFile(report.image, file);

    return this.reportsRepository.modifyReport(id, body);
  }
}
