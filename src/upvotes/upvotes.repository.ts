import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class UpvotesRepository {
  constructor(private readonly dbService: DbService) {}
  async createUpvote(userId: string, postId: string) {
    const query =
      'INSERT INTO upvotes (user_id, report_id, created_at) VALUES (?, ?, NOW())';
    const [result] = await this.dbService
      .getPool()
      .query<ResultSetHeader>(query, [userId, postId]);

    return result.affectedRows > 0 ? { success: true } : { success: false };
  }

  async deleteUpvote(userId: string, postId: string) {
    const query = 'DELETE FROM upvotes WHERE user_id = ? AND report_id = ?';
    const [result] = await this.dbService
      .getPool()
      .query<ResultSetHeader>(query, [userId, postId]);

    return result.affectedRows > 0 ? { success: true } : { success: false };
  }

  async totalUpvotes(postId: string): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM upvotes WHERE report_id = ?';
    const [rows] = await this.dbService.getPool().query(query, [postId]);
    const result = rows as { count: number }[];
    return result[0]?.count || 0;
  }

  async userHasUpvoted(userId: string, postId: string): Promise<boolean> {
    try {
      const query =
        'SELECT 1 FROM upvotes WHERE user_id = ? AND report_id = ? LIMIT 1';
      const [rows] = await this.dbService
        .getPool()
        .query(query, [userId, postId]);
      return (rows as any[]).length > 0 ? true : false;
    } catch (error) {
      throw new Error(`Failed to check upvote status: ${error.message}`);
    }
  }
}
