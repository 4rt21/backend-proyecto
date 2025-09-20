import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class PostReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsNumberString()
  category: number;
}
