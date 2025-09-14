import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserDto, UserService } from "./users.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiOkResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import type { AuthenticatedRequest } from "src/common/interfaces/authenticated-request";
import { DtoUserOptional } from "src/admin/admin.controller";
import { ExceptionResponse } from "src/classes/ExceptionResponse";
import { User } from "./user.repository";

export class CreateUserDto {
    @ApiProperty({example: 'name@domain.com'})
    email: string;
    name: string;
    password: string;
}

@ApiTags('user endpoint')
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    async registerUser(@Body() userDto: CreateUserDto): Promise<UserDto | void> {
        return this.userService.registerUser(userDto.email, userDto.name, userDto.password)
    }

    @Put()
    @ApiBadRequestResponse({description: 'No fields provided to update', type: ExceptionResponse})
    @ApiOkResponse({description: 'User field updated successfully', type: User})
    @ApiConflictResponse({description: "No user can have the same email"})
    @ApiUnauthorizedResponse({description: 'Unauthorized user'})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async partialUpdate(@Req() req: AuthenticatedRequest, @Body() userDto: DtoUserOptional) {
        this.userService.partialUpdate(req.user.profile.id, userDto)   
    }

}