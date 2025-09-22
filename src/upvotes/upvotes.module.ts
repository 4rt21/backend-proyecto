import { Module } from '@nestjs/common';
import { UpvotesService } from './upvotes.service';
import { UpvotesController } from './upvotes.controller';

@Module({
  providers: [UpvotesService],
  controllers: [UpvotesController]
})
export class UpvotesModule {}
