import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  isEnum,
  IsEnum,
  isNumberString,
  IsArray,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ReportStatus } from './get-report-dto';
import { Transform, Type } from 'class-transformer';

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

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: 'user-123' })
  created_by?: string;

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
  @ApiProperty({ example: 'http://example.com/report/123' })
  report_url: string;
}
