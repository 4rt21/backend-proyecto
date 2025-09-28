import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class StatusRepository {
  constructor(private readonly dbService: DbService) {}

  async getStatus() {
    const sql = 'SELECT * FROM status';
    const [result] = await this.dbService.getPool().query(sql);
    return result;
  }
}
