import { ApiProperty } from "@nestjs/swagger";

export class ExceptionResponse {
    @ApiProperty({example: 404})
    statusCode: number;
    @ApiProperty({example: 'Not Found'})
    message: string | string[];
    @ApiProperty({example: 'User not found'})
    error: string;
}