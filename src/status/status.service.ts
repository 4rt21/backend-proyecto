import { Injectable } from '@nestjs/common';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(private readonly statusRepository: StatusRepository) {}

  async getStatus() {
    return this.statusRepository.getStatus();
  }
}
