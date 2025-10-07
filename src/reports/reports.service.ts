import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportsRepository } from './reports.repository';

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

    if (reportDto.created_by === undefined || reportDto.created_by === null) {
      reportDto.created_by = 1;
    }

    console.log(reportDto);
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

  async updateReport(id: string, body: UpdateReportDTO) {
    const report = await this.reportsRepository.findByReportId(id);

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    if (body.category) {
      await this.reportsCategoryRepository.updateReportCategory(
        report.id,
        body.category,
      );
    }

    if (
      body.title ||
      body.description ||
      body.status_id ||
      body.image ||
      body.report_url
    ) {
      await this.reportsRepository.modifyReport(id, body);
    }

    const updatedReport = await this.reportsRepository.findByReportId(id);

    const categories =
      await this.reportsCategoryRepository.getCategoriesByReportId(report.id);
    return { report: updatedReport, categories };
  }
}
