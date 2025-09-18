import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsNumber,
  IsNumberString,
  isInt,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum ReportStatus {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
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
  status?: ReportStatus;

  @IsOptional()
  @IsInt()
  @IsNumberString({}, { message: 'ID must be a valid number' })
  id?: string;
}
