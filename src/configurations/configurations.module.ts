import { Module } from '@nestjs/common';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationsRepository } from './configurations.repositoty';

@Module({
  controllers: [ConfigurationsController],
  providers: [ConfigurationsRepository],
})
export class ConfigurationsModule {}
