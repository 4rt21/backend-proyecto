/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from 'src/common/constants';
import { ExceptionResponse } from 'src/common/interfaces/exception-responses/ExceptionResponse';
import {
  BadRequestExample,
  ConflictResponse,
  NotFoundResponse,
} from 'src/common/interfaces/exception-responses/responses-examples';

import { User } from 'src/users/user.repository';
import { UserService } from 'src/users/users.service';

export class CreateUserOptionalDto {
  @ApiProperty({ example: 'user@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  name?: string;
  @ApiProperty({ example: 'johndoe', required: false })
  @IsOptional()
  username?: string;
  @ApiProperty({ example: '/path/to/image.jpg', required: false })
  @IsOptional()
  image_path?: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @ApiParam({ name: 'id', type: 'string', description: 'El id del usuario' })
  @ApiBody({
    description: 'Los campos a actualizar',
    type: CreateUserOptionalDto,
  })
  @ApiBadRequestResponse({
    description: BadRequestExample.nofieldsToUpdate.summary,
    type: ExceptionResponse,
    examples: {
      nofieldsToUpdate: BadRequestExample.nofieldsToUpdate,
      invalidEmail: BadRequestExample.invalidEmail,
      passwordTooShort: BadRequestExample.passwordTooShort,
    },
  })
  @ApiNotFoundResponse({
    description: NotFoundResponse.userNotFound.summary,
    type: ExceptionResponse,
    example: NotFoundResponse.userNotFound.value,
  })
  @ApiOkResponse({ description: 'User field updated successfully', type: User })
  @ApiConflictResponse({
    description: ConflictResponse.sameEmail.summary,
    type: ExceptionResponse,
    example: ConflictResponse.sameEmail.value,
  })
  @Put('user/:id')
  async putUser(
    @Param('id') id: string,
    @Body() userDto: CreateUserOptionalDto,
  ): Promise<User> {
    return this.userService.partialUpdate(id, userDto);
  }
  @Get('user/list')
  @ApiOkResponse({
    description: 'List of all users',
    type: [User],
    example: [
      {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        password: 'uyqmfaskqdfkkjn1',
        salt: 'randomsalt',
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'Jane Doe',
        password: 'password2',
        salt: 'randomsalt2',
      },
    ],
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiParam({ name: 'id', type: 'string', description: 'El id del usuario' })
  @ApiNotFoundResponse({
    description: 'No user with that id found',
    type: ExceptionResponse,
    example: NotFoundResponse.userNotFound.value,
  })
  @ApiOkResponse({ description: 'User found', type: User })
  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('user/count')
  @ApiOkResponse({
    description: 'Total number of users',
    schema: {
      example: {
        count: 42,
      },
    },
  })
  async getUserCount() {
    return this.userService.getUserCount();
  }
}
