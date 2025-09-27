import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsNumber,
  IsNumberString,
  isInt,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { NotFoundResponse } from 'src/common/interfaces/exception-responses/responses-examples';

export enum ReportStatus {
  PENDIENTE = '1',
  APROBADA = '2',
  RECHAZADA = '3',
}

export class GetReportDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase().trim();
    }
    return value;
  })
  @IsEnum(ReportStatus, {
    message: `Status must be one of the following values: ${Object.values(ReportStatus).join(', ')}`,
  })
  status_id?: ReportStatus;

  @IsOptional()
  @IsNumberString({}, { message: 'ID must be a valid number' })
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be a valid integer' })
  @Min(1, { message: 'Page must be a positive integer greater than 0' })
  page?: number;
}

export class GetReportCountDto {
  @IsOptional()
  @IsEnum(ReportStatus, {
    message: `Status must be one of the following values: ${Object.values(ReportStatus).join(', ')}`,
  })
  status_id?: ReportStatus;
}

export function ApiReportGet() {
  return applyDecorators(
    ApiQuery({
      enum: ReportStatus,
      required: false,
      name: 'status',
      type: String,
      examples: {
        pendiente: {
          value: '1',
        },
        aprobada: {
          value: '2',
        },
        rechazada: {
          value: '3',
        },
      },
    }),
    ApiQuery({
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
    }),
    ApiOkResponse({
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
    }),
    ApiBadRequestResponse({
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
    }),
    ApiNotFoundResponse({
      description: 'Report with specified ID not found.',
      example: NotFoundResponse.userNotFound.value,
    }),
  );
}
