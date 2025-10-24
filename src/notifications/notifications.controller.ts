import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';

export class NotificationsDTO {
  @IsString()
  @ApiProperty({ example: 'El estado de su reporte ha sido actualizado' })
  title: string;
  @IsString()
  @ApiProperty({ example: 'Su reporte ha sido actualizado' })
  message: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2025-10-24T02:21:32.000Z',
    required: false,
    type: Date,
  })
  created_at?: any;

  @IsNumber()
  @ApiProperty({ example: 1 })
  created_by: number;
}

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las notificaciones de un usuario' })
  @ApiOkResponse({
    description: 'Lista de notificaciones obtenida correctamente.',
    example: [
      {
        id: 27,
        message:
          'El estado de su reporte titulado Tienda de componentes de computadoras DDCompus ha sido actualizado a Aprobado',
        created_at: '2025-10-24T02:21:32.000Z',
        created_by: 1,
        title: 'El estado de su reporte ha cambiado a: Aprobado',
      },
      {
        id: 26,
        message:
          'El estado de su reporte titulado Tienda de componentes de computadoras DDCompus ha sido actualizado a Aprobado',
        created_at: '2025-10-24T02:18:27.000Z',
        created_by: 1,
        title: 'El estado de su reporte ha cambiado a: Aprobado',
      },
      {
        id: 24,
        message:
          'El estado de su reporte titulado Pagina fraudulenta ha sido actualizado a Rechazado',
        created_at: '2025-10-24T01:53:38.000Z',
        created_by: 1,
        title: 'El estado de su reporte ha cambiado a: Rechazado',
      },
    ],
  })
  @UseGuards(JwtAuthGuard)
  async getNotifications(@Req() req: AuthenticatedRequest) {
    return this.notificationsService.getAllNotifications(req.user.profile.id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Notificación creada correctamente.',
    example: { message: 'Notificación creada correctamente' },
  })
  @ApiOperation({ summary: 'Crear una nueva notificación' })
  @ApiBadRequestResponse({
    description: 'Datos inválidos para crear la notificación.',
    example: {
      message: ['message must be a string'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiBody({ type: NotificationsDTO })
  async addNotification(@Body() notification: NotificationsDTO) {
    notification.created_at = new Date();
    await this.notificationsService.createNotification(notification);
    return { message: 'Notificación creada correctamente' };
  }
}
