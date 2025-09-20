import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOkResponse({
    description: 'List of all roles',
    example: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ],
  })
  @Get()
  async getAllRoles() {
    return await this.rolesService.getAllRoles();
  }
}
