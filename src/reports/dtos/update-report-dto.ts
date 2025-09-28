import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateReportDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  status_id: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({ example: [1, 2], description: 'Array of category IDs' })
  category: number[];

  @IsOptional()
  image: string;

  @IsUrl()
  @IsOptional()
  report_url: string;
}
