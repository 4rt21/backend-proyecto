import { IsString, IsNotEmpty } from "class-validator";

export class PostReportDto {
  title: string;
  description: string;
  created_by: string;
  status: string;
}
