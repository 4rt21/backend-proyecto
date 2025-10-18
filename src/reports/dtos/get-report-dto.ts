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

  @IsOptional()
  @IsNumber({}, { message: 'created_by must be a valid number' })
  created_by?: number;
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
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      examples: {
        valid: {
          value: 1,
        },
        invalid: {
          value: -1,
        },
      },
    }),
    ApiOkResponse({
      description: 'List of reports retrieved successfully.',
      example: [
        {
          id: 1,
          title: 'Reporte de sitio fraudulento',
          image:
            'report-pictures/1d92a0a7cbb8f6a32b6ff1a98ecf2af4f13293be20e38e7db23ccfca9a412b8a.jpg',
          description:
            'Este sitio web solicita datos bancarios sin medidas de seguridad y redirige a páginas falsas.',
          created_at: '2025-09-27T23:50:39.000Z',
          updated_at: '2025-09-27T23:50:39.000Z',
          user_name: 'Skibidi Toilet',
          created_by: 1,
          user_image: 'profile-pictures/default.jpg',
          report_url: 'https://banco-seguro-falso.com',
          categories: [1, 5],
        },
        {
          id: 2,
          title: 'Página de phishing detectada',
          image:
            'report-pictures/34baf3de9a5ef873b432bd723d9e0d45a4c2b79f915a86d2a7b5419ccf78d66c.jpg',
          description:
            'El portal imita la interfaz de una empresa de envíos para robar credenciales de acceso.',
          created_at: '2025-09-27T23:51:32.000Z',
          updated_at: '2025-09-27T23:51:32.000Z',
          user_name: 'Dr. Sahur',
          created_by: 2,
          user_image: 'profile-pictures/default.jpg',
          report_url: 'https://envios-gratis-seguro.net',
          categories: [2, 5],
        },
        {
          id: 3,
          title: 'Sitio de ventas falsas',
          image:
            'report-pictures/57c0a3a48e923d8bb9e94b3a8ff743a58e9c4e71d4ccf0e6e2e3d513a7f49fdd.jpg',
          description:
            'La página ofrece productos electrónicos a precios demasiado bajos y nunca realiza las entregas.',
          created_at: '2025-09-27T23:51:51.000Z',
          updated_at: '2025-09-27T23:51:51.000Z',
          user_name: 'Dr. Sahur',
          created_by: 3,
          user_image: 'profile-pictures/default.jpg',
          report_url: 'https://ofertas-electronica-barata.org',
          categories: [3, 5],
        },
        {
          id: 5,
          title: 'Plataforma de inversión fraudulenta',
          image:
            'report-pictures/b9237d0f30ecb0a7dc2f84e6a1cc3af324ea742b93a56f5dd8f0cb11e629bf5e.jpg',
          description:
            'El sitio promete ganancias irreales en criptomonedas y exige depósitos sin garantía alguna.',
          created_at: '2025-09-27T23:52:29.000Z',
          updated_at: '2025-09-27T23:52:29.000Z',
          user_name: 'Dr. Sahur',
          created_by: 2,
          user_image: 'profile-pictures/default.jpg',
          report_url: 'https://crypto-ganancias-rapidas.info',
          categories: [4, 5],
        },
        {
          id: 7,
          title: 'Portal falso de soporte técnico',
          image:
            'report-pictures/ccf0a7bb2e9d9a4b8347ff291c4b731ddf28573c4a2a5b5d67e3bc111f0a89f3.jpg',
          description:
            'La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.',
          created_at: '2025-09-27T23:52:50.000Z',
          updated_at: '2025-09-27T23:52:50.000Z',
          user_name: 'Skibidi Toilet',
          created_by: 1,
          user_image: 'profile-pictures/default.jpg',
          report_url: 'https://soporte-oficial-falso.com',
          categories: [1, 4],
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
