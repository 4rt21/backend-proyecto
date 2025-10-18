import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PostReportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Reporte de pagina fraudulenta' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '/images/reports/potholes.png' })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Solicitan informacion personal' })
  description: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'User ID of the creator',
    required: false,
  })
  created_by?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'Status ID of the report' })
  status_id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({ example: [1, 2], description: 'Array of category IDs' })
  category: number[];

  @IsUrl()
  @ApiProperty({ example: 'https://example.com/report/123' })
  report_url: string;

  @IsEnum([0, 1])
  @ApiProperty({ enum: [0, 1], examples: [0, 1] })
  is_anonymous: 0 | 1;
}
