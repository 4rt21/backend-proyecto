// src/upvotes/upvotes.module.ts
import { Module } from '@nestjs/common';
import { UpvotesService } from './upvotes.service';
import { UpvotesController } from './upvotes.controller';
import { UpvotesRepository } from './upvotes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UpvotesController],
  providers: [UpvotesService, UpvotesRepository],
})
export class UpvotesModule {}
