import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { S3Service } from 'src/s3/s3.service';
import { ReportsCategoryRepository } from 'src/reports_category/reports-category-repository';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository, S3Service, ReportsCategoryRepository, CategoriesRepository],
  exports: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
