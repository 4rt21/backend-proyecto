import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}
  async getAllRoles() {
    return await this.rolesRepository.getAllRoles();
  }
}
