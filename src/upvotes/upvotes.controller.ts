import { Controller, Post, UseGuards, Delete, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';

import { UpvotesService } from './upvotes.service';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';

@Controller('upvotes')
export class UpvotesController {
  constructor(private readonly upvotesService: UpvotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ schema: { properties: { reportId: { type: 'string' } } } })
  @ApiOperation({ summary: 'Crea un like a un reporte' })
  @ApiOkResponse({ description: 'Like creado exitosamente' })
  async postUpvote(
    @Req() req: AuthenticatedRequest,
    @Body() body: { reportId: string },
  ) {
    return this.upvotesService.createUpvote(req.user.profile.id, body.reportId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ schema: { properties: { reportId: { type: 'string' } } } })
  @ApiOperation({ summary: 'Elimina un like de un reporte' })
  @ApiOkResponse({
    description: 'Like eliminado exitosamente',
    example: { success: true },
  })
  async deleteUpvote(
    @Req() req: AuthenticatedRequest,
    @Body() body: { reportId: string },
  ) {
    return this.upvotesService.deleteUpvote(req.user.profile.id, body.reportId);
  }

  @Post('total')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ schema: { properties: { postId: { type: 'string' } } } })
  @ApiOkResponse({
    description: 'Total de likes obtenido exitosamente',
    example: 42,
  })
  @ApiOperation({ summary: 'Obtiene el total de likes de un post' })
  async totalUpvotes(
    @Req() req: AuthenticatedRequest,
    @Body() body: { postId: string },
  ) {
    return this.upvotesService.totalUpvotes(body.postId);
  }
}
