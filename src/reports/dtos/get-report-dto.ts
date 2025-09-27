import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsNumber,
  IsNumberString,
  isInt,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum ReportStatus {
  PENDIENTE = '1',
  APROBADA = '2',
  RECHAZADA = '3',
}

export class GetReportDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase().trim();
    }
    return value;
  })
  @IsEnum(ReportStatus, {
    message: `Status must be one of the following values: ${Object.values(ReportStatus).join(', ')}`,
  })
  status_id?: ReportStatus;

  @IsOptional()
  @IsNumberString({}, { message: 'ID must be a valid number' })
  id?: string;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be a valid integer' })
  @Min(1, { message: 'Page must be a positive integer greater than 0' })
  page?: number;
}

export class GetReportCountDto {
  @IsOptional()
  @IsEnum(ReportStatus, {
    message: `Status must be one of the following values: ${Object.values(ReportStatus).join(', ')}`,
  })
  status_id?: ReportStatus;
}
