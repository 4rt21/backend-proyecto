import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { NotificationsDTO } from "./notifications.controller";
import { RowDataPacket } from "mysql2";

@Injectable()
export class NotificationsRepository {
    constructor(private readonly dbService: DbService) {}
    async getAllNotifications(id: string) {
        const [rows] = await this.dbService.getPool().query<RowDataPacket[]>('SELECT * FROM notifications WHERE created_by = ? ORDER BY created_at DESC', [id]);
        return rows;
    }

    async createNotification(notification: NotificationsDTO) {
        return this.dbService.getPool().query('INSERT INTO notifications (title, message, created_at, created_by) VALUES (?, ?, ?, ?)', [notification.title, notification.message, notification.created_at, notification.created_by]);
    }
}