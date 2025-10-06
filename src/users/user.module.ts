import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './users.service';
import { UserRepository } from './user.repository';
import { TokensService } from 'src/auth/tokens.service';
import { ReportsService } from 'src/reports/reports.service';
import { ReportsModule } from 'src/reports/reports.module';
import { ReportsCategoryRepository } from 'src/reports_category/reports-category-repository';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [UserController],
  imports: [ReportsModule, UserModule],
  providers: [
    UserRepository,
    UserService,
    TokensService,
    ReportsCategoryRepository,
    ImagesService,
  ],
  exports: [UserRepository, UserService],
})
export class UserModule {}
