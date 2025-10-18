import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiOkResponse, ApiProperty } from '@nestjs/swagger';

export class DashboardStatDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Tienda de componentes de computadoras DDCompus' })
  title: string;

  @ApiProperty({ example: 2 })
  count: number;
}
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('')
    @ApiOperation({ summary: 'Get dashboard stats' })
    @ApiOkResponse({ description: 'List of dashboard stats', type: DashboardStatDto, isArray: true })
    async getStats() {
        return this.dashboardService.getStats();
    }
}
