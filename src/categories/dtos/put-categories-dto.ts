import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {
  BadRequestExample,
  NotFoundResponse,
} from 'src/common/interfaces/exception-responses/responses-examples';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The ID of the category',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Devices and gadgets',
    required: false,
  })
  @IsOptional()
  description?: string;
}

export function ApiUpdateCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Actualizar una categoría existente' }),
    ApiBadRequestResponse({
      description: 'Error with the request',
      examples: {
        categoryIdRequired: BadRequestExample.categoryIdRequired,
        categoryNotFound: NotFoundResponse.categoryNotFound,
        nofieldsToUpdate: BadRequestExample.nofieldsToUpdate,
        updateFailed: BadRequestExample.updateFailed,
      },
    }),
    ApiOkResponse({
      description: 'The category has been successfully updated.',
      type: UpdateCategoryDto,
      example: {
        id: 1,
        name: 'Electrodomésticos',
        description:
          'Aparatos para el hogar que facilitan las tareas diarias, como refrigeradores, lavadoras o microondas.',
      },
    }),
  );
}
