/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
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
  @ApiOperation({ summary: 'Modifica campos de un usuario por su id' })
  @Put('user/:id')
  async putUser(
    @Param('id') id: string,
    @Body() userDto: CreateUserOptionalDto,
  ): Promise<User> {
    return this.userService.partialUpdate(id, userDto);
  }

  @Get('user/list')
  @ApiOperation({ summary: 'Obtener la lista de todos los usuarios' })
  @ApiOkResponse({
    description: 'List of all users',
    type: [User],
    example: [
      {
        id: 1,
        name: 'Arturo Utrilla',
        email: 'arturo@gmail.com',
        username: 'Arturo_utrilla',
        password:
          'e28dce46d564d38b9b58f6c85ff4bb75ba3df1202991f5b6e1d5e5d585c1b8e7',
        salt: '9tuubdqpqei',
        created_at: '2025-09-25T12:14:44.000Z',
        updated_at: '2025-10-24T01:45:55.000Z',
        image_path:
          'profile-pictures/d84c32b6211caf458c18f49db1992bebbf5dbfccc581e47aad0b77eee3ea637a.jpg',
        role_id: 1,
      },
      {
        id: 6,
        name: 'Ximena Sánchez',
        email: 'ximena@gmail.com',
        username: 'happy_ximena850',
        password:
          '4190cf0be66e814ddb69bfc83cca3b4c92e82f8bc13ebd5bceee987a9fbae3c3',
        salt: '3d513ivgakh',
        created_at: '2025-10-08T15:03:21.000Z',
        updated_at: '2025-10-08T15:03:21.000Z',
        image_path: 'profile-pictures/default.jpg',
        role_id: 1,
      },
      {
        id: 13,
        name: 'Isa Montaño Mendoza',
        email: 'Isa@gmail.com',
        username: 'happy_isa834',
        password:
          'e4ef680582390afd2ee67c7cc4f831c1621ab87e81433655caeeb5746b255473',
        salt: '622l630parc',
        created_at: '2025-10-15T19:24:19.000Z',
        updated_at: '2025-10-15T19:24:19.000Z',
        image_path: 'profile-pictures/default.jpg',
        role_id: 1,
      },
    ],
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('user/count')
  @ApiOperation({ summary: 'Obtener el número total de usuarios' })
  @ApiOkResponse({
    description: 'Total number of users',
    schema: {
      example: {
        count: 12,
      },
    },
  })
  async getUserCount() {
    return this.userService.getUserCount();
  }

  @ApiParam({ name: 'id', type: 'string', description: 'El id del usuario' })
  @ApiNotFoundResponse({
    description: 'No user with that id found',
    type: ExceptionResponse,
    example: NotFoundResponse.userNotFound.value,
  })
  @ApiOkResponse({
    description: 'User found',
    type: User,
    example: {
      id: 1,
      name: 'Arturo Utrilla',
      email: 'arturo@gmail.com',
      username: 'Arturo_utrilla',
      password:
        'e28dce46d564d38b9b58f6c85ff4bb75ba3df1202991f5b6e1d5e5d585c1b8e7',
      salt: '9tuubdqpqei',
      created_at: '2025-09-25T12:14:44.000Z',
      updated_at: '2025-10-24T01:45:55.000Z',
      image_path:
        'profile-pictures/d84c32b6211caf458c18f49db1992bebbf5dbfccc581e47aad0b77eee3ea637a.jpg',
      role_id: 1,
    },
  })
  @ApiOperation({ summary: 'Obtener un usuario por su id' })
  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
