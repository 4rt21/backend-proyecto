import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiOkResponse, ApiProperty } from '@nestjs/swagger';


@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('')
    @ApiOperation({ summary: 'Get dashboard stats' })
    @ApiOkResponse({ description: 'List of dashboard stats', example: {
  "stats": {
    "total_reports": 30,
    "pending_reports": 18,
    "approved_reports": 8,
    "rejected_reports": 4,
    "protected_people": 11,
    "total_users": 12
  },
  "topCategoriesReports": [
    {
      "name": "Muebles",
      "total_reportes": 8
    },
    {
      "name": "Ropa",
      "total_reportes": 4
    },
    {
      "name": "Electrónica",
      "total_reportes": 10
    },
    {
      "name": "Libros",
      "total_reportes": 5
    },
    {
      "name": "Juguetes",
      "total_reportes": 4
    },
    {
      "name": "Deportes",
      "total_reportes": 4
    }
  ],
  "reportsPerMonth": [
    {
      "month": "2025-09",
      "total_reports": 5
    },
    {
      "month": "2025-10",
      "total_reports": 25
    }
  ],
  "topUsers": [
    {
      "name": "Arturo Utrillaa",
      "total_reports": 3
    },
    {
      "name": "Ana Keila Martínez Moreno",
      "total_reports": 3
    },
    {
      "name": "Dr. Sahur",
      "total_reports": 1
    },
    {
      "name": "Dr. Sahur",
      "total_reports": 1
    }
  ],
  "recentAlerts": [
    {
      "id": 45,
      "title": "televisor Smart a precio muy bajo"
    },
    {
      "id": 44,
      "title": "ropa de marca original a súper descuento"
    },
    {
      "id": 43,
      "title": "Prueba"
    },
    {
      "id": 9,
      "title": "Portal falso de soporte técnico"
    },
    {
      "id": 8,
      "title": "Portal falso de soporte técnico"
    }
  ],
  "topReportsMonth": [
    {
      "id": 2,
      "title": "Página de phishing detectada",
      "upvotes": 2
    },
    {
      "id": 7,
      "title": "Portal falso de soporte técnico",
      "upvotes": 2
    },
    {
      "id": 1,
      "title": "Tienda de componentes de computadoras DDCompus",
      "upvotes": 1
    },
    {
      "id": 3,
      "title": "Sitio de ventas falsas",
      "upvotes": 1
    },
    {
      "id": 8,
      "title": "Portal falso de soporte técnico",
      "upvotes": 1
    },
    {
      "id": 9,
      "title": "Portal falso de soporte técnico",
      "upvotes": 1
    },
    {
      "id": 26,
      "title": "Viaje a la luna",
      "upvotes": 1
    },
    {
      "id": 34,
      "title": "ventas de sillas: Silla de oficina que teletransporta a la playa por $300",
      "upvotes": 1
    },
    {
      "id": 44,
      "title": "ropa de marca original a súper descuento",
      "upvotes": 1
    }
  ]
} })
    async getStats() {
        return this.dashboardService.getStats();
    }
}
