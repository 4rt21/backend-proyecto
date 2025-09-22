import { Test, TestingModule } from '@nestjs/testing';
import { UpvotesController } from './upvotes.controller';

describe('UpvotesController', () => {
  let controller: UpvotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpvotesController],
    }).compile();

    controller = module.get<UpvotesController>(UpvotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
