import { Controller, Get } from "@nestjs/common";

@Controller('reports')
export class ReportsController {
    @Get()
    async getReports() {
        return { message: "Reports endpoint" };
    }
}