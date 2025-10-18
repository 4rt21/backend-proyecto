import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class NotificationsDTO {
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsOptional()
  @IsDate()
  created_at?: any;

  @IsNumber()
  created_by: number;
}

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getNotifications(@Req() req: AuthenticatedRequest) {
    return this.notificationsService.getAllNotifications(req.user.profile.id);
  }

  @Post()
  async addNotification(@Body() notification: NotificationsDTO) {
    notification.created_at = new Date();
    return this.notificationsService.createNotification(notification);
  }
}
