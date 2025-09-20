/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';

import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { adminModule } from './admin/admin.module';
import { ReportsModule } from './reports/reports.module';
import { S3Module } from './s3/s3.module';
import { report } from 'process';
import { ReportsCategoryModule } from './reports_category/reports-category.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'supersecret',
    }),
    DbModule,
    UserModule,
    AuthModule,
    adminModule,
    ReportsModule,
    S3Module,
    ReportsCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
