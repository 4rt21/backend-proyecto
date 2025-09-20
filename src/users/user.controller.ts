import {
  BadRequestException,
  Body,
  Controller,
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
  ApiConflictResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { DtoUserOptional } from 'src/admin/admin.controller';
import { ExceptionResponse } from 'src/classes/ExceptionResponse';
import { User } from './user.repository';
import { PostReportDto } from 'src/reports/dtos/post-report-dto';
import { ReportsService } from 'src/reports/reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'name@domain.com' })
  email: string;
  @ApiProperty({ example: 'name' })
  name: string;
  @ApiProperty({ example: 'password123' })
  password: string;
}

@ApiTags('user endpoint')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reportsService: ReportsService,
  ) {}

  @Post('register')
  async registerUser(@Body() userDto: CreateUserDto): Promise<UserDto | void> {
    return this.userService.registerUser(
      userDto.email,
      userDto.name,
      userDto.password,
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
    @Body() userDto: DtoUserOptional,
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

  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.findById(req.user.profile.id);
  }
}
