import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateReportDTO {
  @IsOptional()
  @ApiProperty({
    example: 'Updated Report Title',
    description: 'Title of the report',
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    example: 'The report is about <topic>',
    description: 'Description of the report',
  })
  description: string;

  @IsOptional()
  @ApiProperty({ example: 2, description: 'Status ID of the report' })
  status_id: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({ example: [1, 2], description: 'Array of category IDs' })
  category: number[];

  @IsOptional()
  @ApiProperty({
    example: '/report-pictures/updated_image.png',
    description: 'Path to the report image',
  })
  image: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/report/1',
    description: 'URL of the report',
  })
  report_url: string;
}
