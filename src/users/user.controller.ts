import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto, UserService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { CreateUserOptionalDto } from 'src/admin/admin.controller';

import { User } from './user.repository';
import { PostReportDto } from 'src/reports/dtos/post-report-dto';
import { ReportsService } from 'src/reports/reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MIN_LENGTH,
  MinLength,
  validate,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ExceptionResponse } from 'src/common/interfaces/exception-responses/ExceptionResponse';
import { MIN_PASSWORD_LENGTH } from 'src/common/constants';
import e from 'express';
import { UnauthorizedResponse } from 'src/common/interfaces/exception-responses/responses-examples';
import { ChangePasswordDto } from 'src/Dtos/change-password-dto';

export class CreateUserDto {
  @ApiProperty({ example: 'name@domain.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
  @ApiProperty({ example: '1', default: '1' })
  @IsOptional()
  role_id: string = '1';
}

@ApiTags('user endpoint')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reportsService: ReportsService,
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async registerUser(@Body() userDto: CreateUserDto): Promise<UserDto | void> {
    return this.userService.registerUser(
      userDto.email,
      userDto.name,
      userDto.password,
      userDto.role_id,
    );
  }

  @ApiBadRequestResponse({
    description: 'No fields provided to update',
    type: ExceptionResponse,
  })
  @ApiOkResponse({ description: 'User field updated successfully', type: User })
  @ApiConflictResponse({ description: 'No user can have the same email' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put()
  async partialUpdate(
    @Req() req: AuthenticatedRequest,
    @Body() userDto: CreateUserOptionalDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    this.userService.partialUpdate(req.user.profile.id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('report')
  async postReport(
    @Req() req: AuthenticatedRequest,
    @Body() rawBody: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const body = plainToClass(PostReportDto, {
      title: rawBody.title,
      description: rawBody.description,
      created_by: req.user.profile.id,
      status: rawBody.status,
      category: rawBody.category,
    });

    const errors = await validate(body);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const reportId = await this.reportsService.postReport(body, file);

    const report_category = await this.reportsService.postReportCategory(
      reportId,
      body.category,
    );

    return { reportId, report_category };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: ExceptionResponse,
    example: UnauthorizedResponse.invalidToken.value,
  })
  @ApiOkResponse({ description: 'All information of the user', type: User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.findById(req.user.profile.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Password changed successfully',
    example: {
      message: 'Password changed successfully',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: ExceptionResponse,
    examples: {
      invalidToken: UnauthorizedResponse.invalidToken,
      invalidOldPassword: UnauthorizedResponse.invalidOldPassword,
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    await this.userService.changePassword(
      req.user.profile.id,
      body.oldPassword,
      body.newPassword,
    );
    return { message: 'Password changed successfully' };
  }

  @Get('post-info')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPostInfo(@Req() req: AuthenticatedRequest) {
    return this.userService.getPostInfo(req.user.profile.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  async deleteUser(@Req() req: AuthenticatedRequest) {
    return this.userService.deleteUser(req.user.profile.id);
  }
}
