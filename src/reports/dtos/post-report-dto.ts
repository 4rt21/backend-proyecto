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

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: 'pendiente' })
  status_id: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({ example: [1, 2], description: 'Array of category IDs' })
  category: number[];
}

export class PostReportWithFileDto extends PostReportDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Report image file',
  })
  file: any;
}
