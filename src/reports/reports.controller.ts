import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  GetReportCountDto,
  GetReportDto,
  ReportStatus,
} from './dtos/get-report-dto';
import { PostReportDto, PostReportWithFileDto } from './dtos/post-report-dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateReportDTO } from './dtos/update-report-dto';
import { NotFoundResponse } from 'src/common/interfaces/exception-responses/responses-examples';
import { ApiQueryStatusDto } from 'src/docs/api-querys';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiQuery({
    enum: ReportStatus,
    required: false,
    name: 'status',
    type: String,
    examples: {
      pendiente: {
        value: 'pendiente',
      },
      aprobada: {
        value: 'aprobada',
      },
      rechazada: {
        value: 'rechazada',
      },
    },
  })
  @ApiQuery({
    name: 'id',
    required: false,
    type: String,
    examples: {
      valid: {
        value: '123',
      },
      invalid: {
        value: 'abc',
      },
    },
  })
  @ApiOkResponse({
    description: 'List of reports retrieved successfully.',
    example: [
      {
        id: 1,
        title: 'Potholes in Main Street',
        image: '/images/reports/potholes.png',
        description: 'Large potholes making driving dangerous.',
        created_at: '2025-09-18T04:55:18.000Z',
        updated_at: '2025-09-18T04:55:18.000Z',
        created_by: 1,
        status: 'pendiente',
      },
      {
        id: 2,
        title: 'Broken Street Lights',
        image: '/images/reports/streetlights.png',
        description: 'Many street lights are broken in downtown.',
        created_at: '2025-09-18T04:55:18.000Z',
        updated_at: '2025-09-18T04:55:18.000Z',
        created_by: 2,
        status: 'aprobada',
      },
      {
        id: 3,
        title: 'Water Contamination',
        image: '/images/reports/water.png',
        description: 'Water samples show contamination in area X.',
        created_at: '2025-09-18T04:55:18.000Z',
        updated_at: '2025-09-18T04:55:18.000Z',
        created_by: 3,
        status: 'rechazada',
      },
    ],
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters.',
    content: {
      'application/json': {
        examples: {
          invalidStatus: {
            value: {
              message:
                'Status must be one of the following values: pendiente, aprobada, rechazada',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidId: {
            value: {
              message: 'ID must be a positive integer',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Report with specified ID not found.',
    example: NotFoundResponse.userNotFound.value,
  })
  @Get()
  async getReports(@Query() query: GetReportDto) {
    return this.reportsService.getReports(query.status, query.id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Report',
    type: PostReportWithFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createReport(
    @Body() rawBody: any,
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
    const body = plainToClass(PostReportDto, {
      title: rawBody.title,
      description: rawBody.description,
      created_by: rawBody.created_by,
      status: rawBody.status,
      category: rawBody.category,
    });

    const errors = await validate(body);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const reportId = await this.reportsService.postReport(body, file);

    const report_category = await this.reportsService.postReportCategory(
      reportId,
      body.category,
    );

    return { reportId, report_category };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateReport(
    @Body() body: any,
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.reportsService.updateReport(id, body, file);
  }

  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Report not found',
    example: NotFoundResponse.userNotFound.value,
  })
  @ApiOkResponse({ description: 'Report deleted successfully', example: true })
  async deleteReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(id);
  }

  @ApiOkResponse({ description: 'Count of reports', example: { count: 42 } })
  @Get('count')
  async countReports(@Query() query: ApiQueryStatusDto) {
    return this.reportsService.countReports(query);
  }
}
