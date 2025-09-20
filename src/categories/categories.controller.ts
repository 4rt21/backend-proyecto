import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BadRequestExample } from 'src/common/interfaces/exception-responses/responses-examples';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
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
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({
    description: 'The category has been successfully created.',
    example: {
      id: 1,
      name: 'Electrodomésticos',
      description:
        'Aparatos para el hogar que facilitan las tareas diarias, como refrigeradores, lavadoras o microondas.',
    },
  })
  @ApiBadRequestResponse({
    description: BadRequestExample.nofieldsToUpdate.summary,
    example: BadRequestExample.nofieldsToUpdate.value,
  })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(
      createCategoryDto.name,
      createCategoryDto.description,
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all categories',
    example: [
      {
        id: 1,
        name: 'Electrodomésticos',
        description:
          'Aparatos para el hogar que facilitan las tareas diarias, como refrigeradores, lavadoras o microondas.',
      },
      {
        id: 2,
        name: 'Muebles',
        description:
          'Artículos para amueblar y decorar espacios, incluyendo mesas, sillas, sofás y camas.',
      },
      {
        id: 3,
        name: 'Ropa',
        description:
          'Prendas de vestir para diferentes estilos, climas y ocasiones.',
      },
    ],
  })
  async getCategories() {
    return this.categoriesService.getCategories();
  }
}
