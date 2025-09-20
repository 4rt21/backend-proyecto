import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(name: string, description: string) {
    return this.categoriesRepository.createCategory(name, description);
  }

  async getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
