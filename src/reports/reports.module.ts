import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { S3Service } from 'src/s3/s3.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository, S3Service],
  exports: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
