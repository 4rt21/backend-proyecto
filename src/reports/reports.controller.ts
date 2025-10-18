import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import {
  ApiReportGet,
  GetReportDto,
} from './dtos/get-report-dto';
import { PostReportDto } from './dtos/post-report-dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { NotFoundResponse } from 'src/common/interfaces/exception-responses/responses-examples';
import { ApiQueryStatusDto } from 'src/docs/api-querys';
import { UpdateReportDTO } from './dtos/update-report-dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiReportGet()
  @Get()
  async getReports(@Query() query: GetReportDto) {
    return this.reportsService.getReports(
      query.status_id,
      query.id,
      query.page,
    );
  }

  @ApiBody({
    description: 'Create Report',
    type: PostReportDto,
  })
  @Post()
  async createReport(@Body() body: PostReportDto) {
    const reportId = await this.reportsService.postReport(body);
    const report_category = await this.reportsService.postReportCategory(
      reportId,
      body.category,
    );

    return { reportId, report_category };
  }

  @Put(':id')
  async updateReport(@Body() body: UpdateReportDTO, @Param('id') id: string) {
    if (
      body.category === undefined &&
      body.description === undefined &&
      body.status_id === undefined &&
      body.title === undefined &&
      body.image === undefined &&
      body.report_url === undefined
    ) {
      throw new BadRequestException(
        'At least one field must be provided for update',
      );
    }


    return await this.reportsService.updateReport(id, body);
  }

  @ApiNotFoundResponse({
    description: 'Report not found',
    example: NotFoundResponse.userNotFound.value,
  })
  @ApiOkResponse({ description: 'Report deleted successfully', example: true })
  @Delete(':id')
  async deleteReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(id);
  }

  @ApiOkResponse({ description: 'Count of reports', example: { count: 42 } })
  @Get('count')
  async countReports(@Query() query: ApiQueryStatusDto) {
    return this.reportsService.countReports({ status_id: query.status_id });
  }
}
