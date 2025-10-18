import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { UserService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
const allowedRoles = {
  web: [2],
  mobile: [1],
};

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'web' })
  @IsEnum(['web', 'mobile'], { message: 'Type must be either web or mobile' })
  type: 'web' | 'mobile';
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: TokensService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body()
    dto: LoginDto,
  ) {
    const user = await this.userService.login(dto.email, dto.password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!allowedRoles[dto.type].includes(user.role_id)) {
      throw new UnauthorizedException('aqui no puedes entrar tontito');
    }

    const userProfile = {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role_id: user.role_id as 1 | 2,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(userProfile);
    const refreshToken = await this.tokenService.generateRefreshToken(
      user.id.toString(),
    );

    return { accessToken, refreshToken };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    return { profile: req.user.profile };
  }

  @Post('refresh')
  async refresh(@Body() dto: { refreshToken: string }) {
    try {
      const profile = await this.tokenService.verifyRefreshToken(
        dto.refreshToken,
      );
      const user = await this.userService.findById(profile.sub);
      if (!user) throw new NotFoundException('Usuario no encontrado');
      const newAccessToken = await this.tokenService.generateAccessToken({
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        role_id: user.role_id as 1 | 2,
      });
      const newRefreshToken = await this.tokenService.generateRefreshToken(
        user.id.toString(),
      );
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException(`Invalid refresh token: ${error}`);
    }
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@Req() req: AuthenticatedRequest) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    if (!req.user.profile) { 
      throw new UnauthorizedException('User profile not found');
    }
    if (!req.user.profile.role_id) {
      throw new UnauthorizedException('User role not assigned');
    }

    return { message: 'Token is valid' };
  }
}
