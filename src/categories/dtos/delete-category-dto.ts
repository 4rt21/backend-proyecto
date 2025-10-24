import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  BadRequestExample,
  NotFoundResponse,
} from 'src/common/interfaces/exception-responses/responses-examples';

export class DeleteCategoryDto {
  @ApiProperty({
    description: 'The ID of the category to delete',
    example: 1,
  })
  @IsNotEmpty()
  id: number;
}

export function ApiDeleteCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Eliminar una categoría existente' }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      examples: {
        categoryIdRequired: BadRequestExample.categoryIdRequired,
        categoryNotFound: NotFoundResponse.categoryNotFound,
      },
    }),
    ApiOkResponse({
      description: 'The category has been successfully deleted.',
      example: {
        success: 'true',
      },
    }),
  );
}
