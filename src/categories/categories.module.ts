import { Module } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesRepository, CategoriesService],
  exports: [CategoriesRepository, CategoriesService], // solo si otro módulo los necesita
  controllers: [CategoriesController],
})
export class CategoriesModule {}
