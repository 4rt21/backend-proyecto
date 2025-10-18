import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPropertyOptional,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateSettingsUserDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Enable or disable reactions feature',
    examples: [0, 1],
  })
  is_reactions_enabled?: number;
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Enable or disable review feature',
    examples: [0, 1],
  })
  is_review_enabled?: number;
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Enable or disable reports feature',
    examples: [0, 1],
  })
  is_reports_enabled?: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Enable or disable anonymous feature',
    examples: [0, 1],
  })
  is_anonymous_preferred: number;
}



export function ApiUpdateSettings() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Get user settings',
      type: UpdateSettingsUserDto,
      example: {
        is_reactions_enabled: 1,
        is_review_enabled: 1,
        is_reports_enabled: 1,
      },
    }),
    ApiNotFoundResponse({
      description: 'User not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'User with id 123 not found',
          error: 'Not Found',
        },
      },
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized user',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
  );
}
