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
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { CreateUserOptionalDto } from 'src/admin/admin.controller';
import { User } from './user.repository';
import { PostReportDto } from 'src/reports/dtos/post-report-dto';
import { ReportsService } from 'src/reports/reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ExceptionResponse } from 'src/common/interfaces/exception-responses/ExceptionResponse';
import { UnauthorizedResponse } from 'src/common/interfaces/exception-responses/responses-examples';
import { ChangePasswordDto } from 'src/DTOS/change-password-dto';
import {
  ApiUserCreate,
  CreateUserDto,
  RegisterResponseDto,
} from 'src/DTOS/user-controller/create-user-dto';
import { ApiUserUpdate } from 'src/DTOS/user-controller/update-user-dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reportsService: ReportsService,
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiUserCreate()
  async registerUser(@Body() userDto: CreateUserDto): Promise<UserDto | void> {
    return this.userService.registerUser(
      userDto.email,
      userDto.name,
      userDto.password,
      userDto.role_id,
    );
  }

  @ApiUserUpdate()
  @UseGuards(JwtAuthGuard)
  @Put()
  async partialUpdate(
    @Req() req: AuthenticatedRequest,
    @Body() userDto: CreateUserOptionalDto,
  ) {
    return await this.userService.partialUpdate(req.user.profile.id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('report')
  async postReport(
    @Req() req: AuthenticatedRequest,
    @Body() body: PostReportDto,
  ) {
    const sendBody: PostReportDto = {
      ...body,
      created_by: req.user.profile.id,
    };

    const reportId = await this.reportsService.postReport(sendBody);

    console.log('reportId: ', reportId);
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
export { CreateUserDto };
