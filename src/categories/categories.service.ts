import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { UpdateCategoryDto } from './dtos/put-categories-dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(name: string, description: string) {
    return this.categoriesRepository.createCategory(name, description);
  }

  async getCategories() {
    return this.categoriesRepository.getCategories();
  }

  async updateCategory(body: UpdateCategoryDto) {
    if (!body.id) {
      throw new BadRequestException('Category ID is required for update.');
    }

    const existingCategory = await this.categoriesRepository.categoryExists(
      body.id,
    );

    if (!existingCategory) {
      throw new BadRequestException(
        `Category with ID ${body.id} does not exist.`,
      );
    }

    if (!body.name && !body.description) {
      throw new BadRequestException(
        'At least one field (name or description) must be provided for update.',
      );
    }

    const isUpdate = await this.categoriesRepository.updateCategory(body);

    if (!isUpdate) {
      throw new BadRequestException('Failed to update the category.');
    }

    return this.categoriesRepository.findById(body.id);
  }

  async deleteCategory(id: number) {
    if (!id) {
      throw new BadRequestException('Category ID is required for deletion.');
    }

    const existingCategory = await this.categoriesRepository.categoryExists(id);

    if (!existingCategory) {
      throw new BadRequestException(`Category with ID ${id} does not exist.`);
    }

    return this.categoriesRepository.deleteCategory(id);
  }
}
