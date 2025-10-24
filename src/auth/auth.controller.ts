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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Login del usuario' })
  @ApiOkResponse({
    description: 'Login exitoso',
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidHlwZSI6ImFjY2VzcyIsInByb2ZpbGUiOnsiaWQiOiIxIiwiZW1haWwiOiJhcnR1cm9AZ21haWwuY29tIiwibmFtZSI6IkFydHVybyBVdHJpbGxhYSDDiURJVCIsInJvbGVfaWQiOjF9LCJpYXQiOjE3NjEyOTI0MTEsImV4cCI6MTc2MTI5NjAxMX0.ECBWVGu-tXr7Shs9qvg9LMISOXtFQmp3R8C5Uk8cUuw',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NjEyOTI0MTEsImV4cCI6MTc2MTg5NzIxMX0.tA-fCXWmhTzE1YlOXTpftjn_qFzZJoZaCJEPBEYrYZI',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas o acceso no autorizado',
    example: {
      message: 'Invalid password',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
    example: {
      message: 'User not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiBadRequestResponse({
    description: 'Email inválido',
    example: {
      message: ['email must be an email'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
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
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiOkResponse({
    description: 'Perfil del usuario obtenido exitosamente',
    example: {
      profile: {
        profile: {
          id: '1',
          email: 'arturo@gmail.com',
          name: 'Arturo Utrillaa',
          role_id: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token inválido o no proporcionado',
    example: {
      message: 'Invalid token',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    return { profile: req.user.profile };
  }

  @ApiOperation({ summary: 'Refrescar el token de acceso' })
  @ApiOkResponse({
    description: 'Token de acceso refrescado exitosamente',
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidHlwZSI6ImFjY2VzcyIsInByb2ZpbGUiOnsiaWQiOiIxIiwiZW1haWwiOiJhcnR1cm9AZ21haWwuY29tIiwibmFtZSI6IkFydHVybyBVdHJpbGxhYSDDiURJVCIsInJvbGVfaWQiOjF9LCJpYXQiOjE3NjEyOTI0MTEsImV4cCI6MTc2MTI5NjAxMX0.ECBWVGu-tXr7Shs9qvg9LMISOXtFQmp3R8C5Uk8cUuw',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NjEyOTI0MTEsImV4cCI6MTc2MTg5NzIxMX0.tA-fCXWmhTzE1YlOXTpftjn_qFzZJoZaCJEPBEYrYZI',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token de refresco inválido',
    example: {
      message: 'Invalid refresh token: JsonWebTokenError: invalid signature',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
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
  @ApiOperation({ summary: 'Verificar la validez del token de acceso' })
  @ApiOkResponse({
    description: 'Token de acceso válido',
    example: {
      message: 'Token is valid',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token de acceso inválido o no proporcionado',
    example: {
      message: 'Invalid token',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
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
