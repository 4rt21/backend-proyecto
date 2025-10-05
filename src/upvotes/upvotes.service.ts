import { ConflictException, Injectable } from '@nestjs/common';
import { UpvotesRepository } from './upvotes.repository';

@Injectable()
export class UpvotesService {
  constructor(private readonly upvotesRepository: UpvotesRepository) {}

  async createUpvote(userId: string, reportId: string) {
    const userLike = await this.upvotesRepository.userHasUpvoted(
      userId,
      reportId,
    );

    if (userLike === true) {
      throw new ConflictException('User has already upvoted this report');
    }

    const result = await this.upvotesRepository.createUpvote(userId, reportId);

    const likes = await this.upvotesRepository.totalUpvotes(reportId);

    return { ...result, likes, reportId, userId };
  }

  async deleteUpvote(userId: string, reportId: string) {
    const userLike = await this.upvotesRepository.userHasUpvoted(
      userId,
      reportId,
    );

    if (userLike === false) {
      throw new ConflictException('User has not upvoted this report');
    }

    const result = await this.upvotesRepository.deleteUpvote(userId, reportId);
    const likes = await this.upvotesRepository.totalUpvotes(reportId);

    return { ...result, likes, reportId, userId };
  }

  async totalUpvotes(reportId: string): Promise<number> {
    return this.upvotesRepository.totalUpvotes(reportId);
  }
}
