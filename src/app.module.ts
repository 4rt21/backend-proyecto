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
import { ReportsCategoryModule } from './reports_category/reports-category.module';
import { CategoriesModule } from './categories/categories.module';
import { RolesModule } from './roles/roles.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UpvotesModule } from './upvotes/upvotes.module';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';
import { StatusModule } from './status/status.module';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigurationsModule } from './configurations/configurations.module';
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
    ReportsCategoryModule,
    CategoriesModule,
    RolesModule,
    NotificationsModule,
    UpvotesModule,
    ImagesModule,
    StatusModule,
    DashboardModule,
    ConfigurationsModule,
  ],
  controllers: [AppController, DashboardController],
  providers: [AppService, ImagesService, DashboardService],
})
export class AppModule {}
