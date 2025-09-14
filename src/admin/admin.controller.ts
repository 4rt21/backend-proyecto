/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty} from "@nestjs/swagger";
import { ExceptionResponse } from "src/classes/ExceptionResponse";
import { User } from "src/users/user.repository";
import { UserService } from "src/users/users.service";



export class DtoUserOptional {
    @ApiProperty({example: 'user@example.com', required: false})
    email?: string
    @ApiProperty({example: 'password123', required: false})
    password?: string
    @ApiProperty({example: 'John Doe', required: false})
    name?:string
}


@Controller('admin')
export class AdminController {
    constructor(private readonly userService: UserService) {}

    @ApiParam({name: 'id', type: 'string', description: 'El id del usuario'})
    @ApiBody({type: DtoUserOptional, required: true, description: 'Los campos a actualizar'})
    @ApiBadRequestResponse({description: 'No fields provided to update', type: ExceptionResponse})
    @ApiNotFoundResponse({description: 'No user with that id found', type: ExceptionResponse})
    @ApiOkResponse({description: 'User field updated successfully', type: User})
    @ApiConflictResponse({description: "No user can have the same email"})

    @Put('user/:id')
    async putUser(@Param('id') id: string, @Body() userDto: DtoUserOptional): Promise<User> {
        return this.userService.partialUpdate(id, userDto)
    }
    @Get('user/list')
    @ApiOkResponse({description: 'List of all users', type: [User]})

    async getAllUsers() {
        return this.userService.getAllUsers()
    }
    
    @ApiParam({name: 'id', type: 'string', description: 'El id del usuario'})
    @ApiNotFoundResponse({description: 'No user with that id found', type: ExceptionResponse})
    @ApiOkResponse({description: 'User found', type: User})

    @Get('user/:id')
    async getUser(@Param('id') id: string) {
        return this.userService.findById(id)
    }
}