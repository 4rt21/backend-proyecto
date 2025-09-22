import { Test, TestingModule } from '@nestjs/testing';
import { UpvotesService } from './upvotes.service';

describe('UpvotesService', () => {
  let service: UpvotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpvotesService],
    }).compile();

    service = module.get<UpvotesService>(UpvotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
