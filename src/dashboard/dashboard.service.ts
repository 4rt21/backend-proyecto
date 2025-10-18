import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DashboardService {
  constructor(private readonly dbService: DbService) {}

  async getStats() {
    const [data] = await this.dbService.getPool().query(`
            SELECT
                (SELECT COUNT(*) FROM reports) AS total_reports,
                (SELECT COUNT(*) FROM reports WHERE status_id=1) AS pending_reports,
                (SELECT COUNT(*) FROM reports WHERE status_id=2) AS approved_reports,
                (SELECT COUNT(*) FROM reports WHERE status_id=3) AS rejected_reports,
                (SELECT COUNT(*) FROM upvotes) AS protected_people,
                (SELECT COUNT(*) FROM users) AS total_users;`);

    const [topCategoriesReports] = await this.dbService.getPool().query(`
            SELECT c.name, COUNT(c.id) AS total_reportes FROM categories c
            LEFT JOIN report_categories rc
                ON c.id = rc.category_id
            GROUP BY c.id;
            `);

    const [reportsPerMonth] = await this.dbService.getPool().query(`
            SELECT
                DATE_FORMAT(r.created_at, '%Y-%m') AS month,
                COUNT(r.id) AS total_reports
            FROM reports r
            WHERE r.created_at >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
            GROUP BY month
            ORDER BY month;
        `);

    const [topUsers] = await this.dbService.getPool().query(`
            SELECT u.name, COUNT(r.id) AS total_reports FROM users u
            LEFT JOIN reports r
                ON u.id = r.created_by
            WHERE r.status_id = 2
            GROUP BY u.id
            ORDER BY total_reports DESC
            LIMIT 5;
        `);

    const [recentAlerts] = await this.dbService.getPool().query(`
            SELECT r.id, r.title FROM reports r
            WHERE r.status_id = 2
            ORDER BY r.created_at DESC
            LIMIT 5;
        `);

    const [topReportsMonth] = await this.dbService.getPool().query(`
            SELECT
                r.id,
                r.title,
                COUNT(r.id) AS upvotes
            FROM reports r
            JOIN upvotes u ON r.id = u.report_id 
            WHERE r.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
            GROUP BY r.id;
            ORDER BY upvotes DESC
        `);
    return {
      stats: data[0],
      topCategoriesReports: topCategoriesReports,
      reportsPerMonth: reportsPerMonth,
      topUsers: topUsers,
      recentAlerts: recentAlerts,
      topReportsMonth: topReportsMonth,
    };
  }
}
