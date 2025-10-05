import { Controller, Post, UseGuards, Delete, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';

import { UpvotesService } from './upvotes.service';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request';

@Controller('upvotes')
export class UpvotesController {
  constructor(private readonly upvotesService: UpvotesService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async postUpvote(
    @Req() req: AuthenticatedRequest,
    @Body() body: { reportId: string },
  ) {
    return this.upvotesService.createUpvote(req.user.profile.id, body.reportId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUpvote(
    @Req() req: AuthenticatedRequest,
    @Body() body: { reportId: string },
  ) {
    return this.upvotesService.deleteUpvote(req.user.profile.id, body.reportId);
  }

  @Post('total')
  @UseGuards(JwtAuthGuard)
  async totalUpvotes(
    @Req() req: AuthenticatedRequest,
    @Body() body: { postId: string },
  ) {
    return this.upvotesService.totalUpvotes(body.postId);
  }
}
