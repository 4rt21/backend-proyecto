import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  BadRequestExample,
  ConflictResponse,
  UnauthorizedResponse,
} from 'src/common/interfaces/exception-responses/responses-examples';
import { User } from 'src/users/user.repository';

export function ApiUserUpdate() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'User field updated successfully',
      type: User,
    }),
    ApiResponse({
      status: 400,
      description: 'No fields provided to update',
      example: BadRequestExample.nofieldsToUpdate.value,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized user',
      example: UnauthorizedResponse.invalidToken.value,
    }),
    ApiResponse({
      status: 409,
      description: 'No user can have the same email',
      example: ConflictResponse.sameEmail.value,
    }),
  );
}
