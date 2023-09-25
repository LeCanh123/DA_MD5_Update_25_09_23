import { Test, TestingModule } from '@nestjs/testing';
import { BagsController } from './bags.controller';
import { BagsService } from './bags.service';

describe('BagsController', () => {
  let controller: BagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BagsController],
      providers: [BagsService],
    }).compile();

    controller = module.get<BagsController>(BagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
