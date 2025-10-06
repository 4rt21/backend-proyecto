import { Module } from '@nestjs/common';
import { ReportsCategoryRepository } from './reports-category-repository';

@Module({
  providers: [ReportsCategoryRepository],
  exports: [ReportsCategoryRepository],
})
export class ReportsCategoryModule {}
