import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, createPool } from 'mysql2/promise';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  onModuleInit(): void {
    this.pool = createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
  }
  onModuleDestroy() {
    void this.pool.end();
  }

  getPool(): Pool {
    return this.pool;
  }
}
