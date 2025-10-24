import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Obtienes todos los estados de los reportes' })
  @ApiOkResponse({
    description: 'Estados de los reportes obtenidos correctamente.',
    example: [
      {
        id: 1,
        status: 'pendiente',
      },
      {
        id: 2,
        status: 'aprobada',
      },
      {
        id: 3,
        status: 'rechazada',
      },
    ],
  })
  getStatus() {
    return this.statusService.getStatus();
  }
}
