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

  async getReports(status_id?: string, id?: string, page?: number) {
    const reports = await this.reportsRepository.getAllReports(
      status_id,
      id,
      page,
    );

    if (id && reports.length === 0) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    if (status_id && reports.length === 0) {
      throw new NotFoundException(
        `No reports found with status ID ${status_id}`,
      );
    }

    return reports;
  }

  async postReport(reportDto: PostReportDto): Promise<number> {
    reportDto.category.map((id) => {
      const doesCategoryExists = this.categoriesRepository.findById(id);

      if (!doesCategoryExists) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    });

    const result: any = await this.reportsRepository.createReport(reportDto);

    if (typeof result !== 'object' && !('insertId' in result)) {
      throw new HttpException(
        'Report creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result.insertId;
  }

  async postReportCategory(reportId: number, categoryId: number[]) {
    await Promise.all(
      categoryId.map((id) => {
        return this.reportsCategoryRepository.createReportCategory(
          reportId,
          id,
        );
      }),
    );

    return await this.reportsCategoryRepository.getCategoriesByReportId(
      reportId,
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
    const report = await this.reportsRepository.findByReportId(id);

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    if (body.category) {
      this.reportsCategoryRepository.updateReportCategory(
        report.id,
        body.category,
      );
    }

    if (file) {
      const path = await this.imagesService.modifyFile(report.image, 'file');
      body = { ...body, image: path };
    }
    console.log('body: ', body);
    if (body.title || body.description || body.status_id) {
      await this.reportsRepository.modifyReport(id, body);
    }

    return this.reportsRepository.findByReportId(id);
  }
}
