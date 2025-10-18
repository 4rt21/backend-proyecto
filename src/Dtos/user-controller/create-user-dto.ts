import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from 'src/common/constants';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiProperty } from '@nestjs/swagger';
export class UserSettingsDto {
  @ApiProperty({ example: 7 })
  id: number;

  @ApiProperty({ example: 2 })
  user_id: number;

  @ApiProperty({ example: 1 })
  is_reactions_enabled: number;

  @ApiProperty({ example: 1 })
  is_review_enabled: number;

  @ApiProperty({ example: 1 })
  is_reports_enabled: number;
}

export class UserResponseDto {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'Dr. Sahur' })
  name: string;

  @ApiProperty({ example: 'thungthungsahur@gmail.com' })
  email: string;

  @ApiProperty({ example: 'cool_dr.527' })
  username: string;

  @ApiProperty({ example: 'go4fzup9s4m' })
  salt: string;

  @ApiProperty({ example: '2025-09-25T14:59:41.000Z' })
  created_at: string;

  @ApiProperty({ example: '2025-09-25T14:59:41.000Z' })
  updated_at: string;

  @ApiProperty({ example: 'profile-pictures/default.jpg' })
  image_path: string;

  @ApiProperty({ example: 1 })
  role_id: number;
}

export class RegisterResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: [UserSettingsDto] })
  settings: UserSettingsDto[];
}

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
  @ApiProperty({ example: '1', default: '1', required: false })
  @IsOptional()
  role_id: string = '1';
}

// documentacion

export function ApiUserCreate() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'User field updated successfully',
      type: RegisterResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Fields missing or validation error',
      examples: {
        noName: {
          summary: 'No name provided',
          value: {
            message: ['Name should not be empty'],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
        noEmail: {
          summary: 'No email provided',
          value: {
            message: ['Email should not be empty'],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      },
    }),
  );
}
