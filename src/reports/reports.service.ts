import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { S3Service } from 'src/s3/s3.service';
import { PostReportDto } from './dtos/post-report-dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly s3Service: S3Service,
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

  async postReport(reportDto: PostReportDto, file: Express.Multer.File) {
    const file_path = await this.s3Service.uploadFile(file);

    if (!file_path) {
      throw new HttpException(
        'File upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.reportsRepository.createReport(reportDto, file_path);
  }
}
