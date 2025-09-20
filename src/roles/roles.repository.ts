import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class RolesRepository {
  constructor(private readonly dbService: DbService) {}

  async getAllRoles() {
    const [rows] = await this.dbService.getPool().query('SELECT * FROM role');
    return rows;
  }
}
