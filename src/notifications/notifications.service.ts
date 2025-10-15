import { Injectable } from '@nestjs/common';
import { NotificationsDTO } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { ConfigurationsRepository } from 'src/configurations/configurations.repositoty';

@Injectable()
export class NotificationsService {
    constructor(private readonly notificationsRepository: NotificationsRepository, private readonly configurationsRepository: ConfigurationsRepository) {}
    async getAllNotifications(id: string) {

        const userConfig = await this.configurationsRepository.getConfigurationById(id);
        if (userConfig && userConfig.is_review_enabled === 0) {
            return []; 
        }
        
        return this.notificationsRepository.getAllNotifications(id);
    }

    async createNotification(notification: NotificationsDTO) {
        return this.notificationsRepository.createNotification(notification);
    }
}
