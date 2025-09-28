import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { ReportsCategoryRepository } from 'src/reports_category/reports-category-repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,
    ReportsRepository,
    ReportsCategoryRepository,
    CategoriesRepository,
    ImagesService,
  ],
  exports: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
