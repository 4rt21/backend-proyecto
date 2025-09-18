import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetReportDto } from './dtos/get-report-dto';
import { PostReportDto } from './dtos/post-report-dto';
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async getReports(@Query() query: GetReportDto) {
    console.log('Query Parameters:', query);
    return this.reportsService.getReports(query.status, query.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createReport(
    @Body() rawbody: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const body: PostReportDto = {
      title: rawbody.title,
      description: rawbody.description,
      created_by: rawbody.created_by,
      status: rawbody.status,
    };
    return this.reportsService.postReport(body, file);
  }
}
