import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  isEnum,
  IsEnum,
  isNumberString,
} from 'class-validator';
import { ReportStatus } from './get-report-dto';

export class PostReportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Reporte de pagina fraudulenta' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Solicitan informacion personal' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user-123' })
  created_by: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: 'pendiente' })
  status_id: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: 1 })
  category: number;
}

export class PostReportWithFileDto extends PostReportDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Report image file',
  })
  file: any;
}
