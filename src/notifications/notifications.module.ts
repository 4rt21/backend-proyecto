import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigurationsRepository } from 'src/configurations/configurations.repositoty';
import { NotificationsRepository } from './notifications.repository';
import { TokensService } from 'src/auth/tokens.service';

@Module({
  providers: [NotificationsService, NotificationsRepository, ConfigurationsRepository, TokensService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
