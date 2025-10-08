import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { UpdateSettingsUserDto } from "./update-settings-dto";

export function ApiGetSettings() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Get user settings',
      type: UpdateSettingsUserDto,
      example: {
        is_reactions_enabled: 1,
        is_review_enabled: 1,
        is_reports_enabled: 1,
      },
    }),
  );
}