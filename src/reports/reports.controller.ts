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
import { ApiReportGet, GetReportDto } from './dtos/get-report-dto';
import { PostReportDto } from './dtos/post-report-dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
  @ApiOkResponse({
    description: 'Report created successfully',
    schema: {
      example: {
        reportId: 48,
        report_category: [2, 3],
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    examples: {
      missingFields: {
        summary: 'Missing required fields',
        value: {
          statusCode: 400,
          message: 'field should not be empty',
          error: 'Bad Request',
        },
      },
      invalidCategory: {
        summary: 'Invalid category',
        value: {
          statusCode: 400,
          message: 'One or more categories are invalid',
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Crea un nuevo reporte' })
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
  @ApiOperation({ summary: 'Actualiza un reporte existente' })
  @ApiOkResponse({
    description: 'Se actualizo el reporte correctamente',
    example: {
      report: {
        id: 53,
        title: 'Reporte de pagina fraudulenta',
        image: '/images/reports/potholes.png',
        description: 'Solicitan informacion personal',
        created_at: '2025-10-24T02:33:21.000Z',
        updated_at: '2025-10-24T02:33:21.000Z',
        created_by: 1,
        status_id: 1,
        report_url: 'https://example.com/report/123',
        is_anonymous: 0,
      },
      categories: [2, 3],
    },
  })
  @ApiBadRequestResponse({
    description: 'No hay campos para actualizar',
    example: {
      message: 'At least one field must be provided for update',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
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
  @ApiOkResponse({ description: 'Report deleted successfully', example: { success: true } })
  @ApiOperation({ summary: 'Elimina un reporte por su ID' })
  @Delete(':id')
  async deleteReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(id);
  }

  @ApiOkResponse({ description: 'Count of reports', example: { count: 42 } })
  @Get('count')
  @ApiOperation({ summary: 'Cuenta los reportes, opcionalmente por estado' })
  async countReports(@Query() query: ApiQueryStatusDto) {
    return this.reportsService.countReports({ status_id: query.status_id });
  }
}
