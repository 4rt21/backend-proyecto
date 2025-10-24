import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserDto, UserService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { CreateUserOptionalDto } from 'src/admin/admin.controller';
import { User } from './user.repository';
import { PostReportDto } from 'src/reports/dtos/post-report-dto';
import { ReportsService } from 'src/reports/reports.service';

import { ExceptionResponse } from 'src/common/interfaces/exception-responses/ExceptionResponse';
import { UnauthorizedResponse } from 'src/common/interfaces/exception-responses/responses-examples';
import { ChangePasswordDto } from 'src/DTOS/change-password-dto';
import {
  ApiUserCreate,
  CreateUserDto,
} from 'src/DTOS/user-controller/create-user-dto';
import { ApiUserUpdate } from 'src/DTOS/user-controller/update-user-dto';
import { UpdateReportDTO } from 'src/reports/dtos/update-report-dto';
import {
  ApiUpdateSettings,
  UpdateSettingsUserDto,
} from './dtos/update-settings-dto';
import { ApiGetSettings } from './dtos/get-settings-dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reportsService: ReportsService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registro de un nuevo usuario' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'El usuario actualiza su información' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async partialUpdate(
    @Req() req: AuthenticatedRequest,
    @Body() userDto: CreateUserOptionalDto,
  ) {
    return await this.userService.partialUpdate(req.user.profile.id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'El usuario crea un nuevo reporte' })
  @Post('report')
  async postReport(
    @Req() req: AuthenticatedRequest,
    @Body() body: PostReportDto,
  ) {
    const sendBody: PostReportDto = {
      ...body,
      created_by: Number(req.user.profile.id),
    };

    const reportId = await this.reportsService.postReport(sendBody);

    const report_category = await this.reportsService.postReportCategory(
      reportId,
      body.category,
    );

    return { reportId, report_category };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('reports')
  @ApiOperation({summary: 'El usuario obtiene todos los reportes que ha realizado'})
  async getUserReports(@Req() req: AuthenticatedRequest) {
    const id = req.user.profile.id;
    return await this.reportsService.getUserReports(Number(id));
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: ExceptionResponse,
    example: UnauthorizedResponse.invalidToken.value,
  })
  @ApiOkResponse({ description: 'All information of the user', type: User })
  @ApiOperation({ summary: 'El usuario obtiene la información de su perfil' })
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
  @ApiOperation({ summary: 'El usuario cambia su contraseña' })
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
  @ApiOperation({
    summary:
      'El usuario obtiene información sobre los reportes que ha realizado',
  })
  @ApiOkResponse({
    example: {
      pendiente: 1,
      aprobada: 3,
      rechazada: 0,
      total: 4,
      protegidas: 5,
    },
  })
  @ApiBearerAuth()
  async getPostInfo(@Req() req: AuthenticatedRequest) {
    return this.userService.getPostInfo(req.user.profile.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'El usuario borra su perfil' })
  @ApiBearerAuth()
  @Delete()
  async deleteUser(@Req() req: AuthenticatedRequest) {
    return this.userService.deleteUser(req.user.profile.id);
  }

  @Get('settings-info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'El usuario obtiene la configuración de su perfil' })
  @ApiBearerAuth()
  @ApiGetSettings()
  async getUserSettings(@Req() req: AuthenticatedRequest) {
    return this.userService.getUserInfo(req.user.profile.id);
  }

  @Put('settings-info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'El usuario cambia algún elemento de su configuración',
  })
  @ApiBearerAuth()
  @ApiUpdateSettings()
  async updateSettingsInfo(
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdateSettingsUserDto,
  ) {
    return this.userService.updateUserSettings(req.user.profile.id, body);
  }
}

export { CreateUserDto };
