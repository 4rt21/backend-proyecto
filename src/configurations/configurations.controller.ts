import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ConfigurationsRepository } from './configurations.repositoty';

export default class UpdateConfigutationDto {
  title: string;
  text: string;
}

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsRepository: ConfigurationsRepository) {}
  @Get(':id')
  async getConfiguration(@Param('id') id: string) {
    return this.configurationsRepository.getConfigurationById(id);
  }

  @Put(':id')
  async updateConfiguration(@Param('id') id: string, @Body() body: Partial<UpdateConfigutationDto>) {
    return this.configurationsRepository.updateConfigurationById(id, body);
  }  
}
