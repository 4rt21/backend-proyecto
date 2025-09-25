// api-query-status.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ReportStatus } from 'src/reports/dtos/get-report-dto';

export class ApiQueryStatusDto {
  @ApiPropertyOptional({
    description: 'Filter reports by status',
    enum: ReportStatus,
    examples: {
      pendiente: { value: ReportStatus.PENDIENTE },
      aprobada: { value: ReportStatus.APROBADA },
      rechazada: { value: ReportStatus.RECHAZADA },
    },
  })
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
}
