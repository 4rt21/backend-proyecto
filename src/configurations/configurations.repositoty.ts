import { BadRequestException, Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DbService } from 'src/db/db.service';
import UpdateConfigurationDto from './configurations.controller';
@Injectable()
export class ConfigurationsRepository {
  constructor(private readonly dbService: DbService) {}
  async getConfigurationById(id: string): Promise<RowDataPacket> {
    const sql = 'SELECT * FROM configurations WHERE id = ?';
    const [rows] = await this.dbService
      .getPool()
      .query<RowDataPacket[]>(sql, [id]);
    return rows[0];
  }

  async updateConfigurationById(
    id: string,
    data: Partial<UpdateConfigurationDto>,
  ): Promise<RowDataPacket> {

    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('No data provided for update');
    }

    console.log(data);

    const updates: string[] = [];
    const values: any[] = [];

    if (data.text) {
      updates.push('text = ?');
      values.push(data.text);
    }

    if (data.title) {
      updates.push('title = ?');
      values.push(data.title);
    }

    if (updates.length === 0) {
      throw new BadRequestException('No valid fields provided for update');
    }

    const sql = `UPDATE configurations SET ${updates.join(', ')} WHERE id = ?`;

    const [result] = await this.dbService
      .getPool()
      .query<RowDataPacket[]>(sql, [data, id]);

    return result[0];
  }
}
