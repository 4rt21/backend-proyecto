import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;
  @ApiProperty({
    description: 'The description of the category',
    example: 'Devices and gadgets',
  })
  description: string;
}

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(
      'Creating category with name:',
      createCategoryDto.name,
      'and description:',
      createCategoryDto.description,
    );
    return this.categoriesService.createCategory(
      createCategoryDto.name,
      createCategoryDto.description,
    );
  }

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }
}
