import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetReportDto, ReportStatus } from './dtos/get-report-dto';
import { PostReportDto } from './dtos/post-report-dto';
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
        summary: 'Pendiente status',
        value: 'pendiente',
      },
      aprobada: {
        summary: 'Aprobada status',
        value: 'aprobada',
      },
      rechazada: {
        summary: 'Rechazada status',
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
        summary: 'Valid ID',
        value: '123',
      },
      invalid: {
        summary: 'Invalid ID',
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
      {
        id: 4,
        title: 'Unsafe School Crossing',
        image: '/images/reports/school.png',
        description: 'Children face danger crossing street near school.',
        created_at: '2025-09-18T04:55:18.000Z',
        updated_at: '2025-09-18T04:55:18.000Z',
        created_by: 4,
        status: 'pendiente',
      },
      {
        id: 5,
        title: 'Noise Pollution in Downtown',
        image: '/images/reports/noise.png',
        description: 'Excessive noise affecting residents.',
        created_at: '2025-09-18T04:55:18.000Z',
        updated_at: '2025-09-18T04:55:18.000Z',
        created_by: 5,
        status: 'aprobada',
      },
      {
        id: 9,
        title: 'Pagina fraudulenta',
        image:
          'https://ofraud-storage-system.s3.us-east-2.amazonaws.com/ff2927b15588f7b474578b8c72be3de0a2e256a9469338a5cf7214845c5a4812',
        description: 'This is a description for the first report.',
        created_at: '2025-09-18T22:21:55.000Z',
        updated_at: '2025-09-18T22:21:55.000Z',
        created_by: 1,
        status: 'pendiente',
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
              message: [
                'Status must be one of the following values: pendiente, aprobada, rechazada',
              ],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidId: {
            value: {
              message: ['ID must be a positive integer'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Report with specified ID not found .',
    example: {
      message: 'Report with ID 2.3 not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get()
  async getReports(@Query() query: GetReportDto) {
    return this.reportsService.getReports(query.status, query.id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Report',
    type: PostReportDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
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

  @Put()
  async updateReport() {
    
  }
}
