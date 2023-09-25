import { Test, TestingModule } from '@nestjs/testing';
import { BagsService } from './bags.service';

describe('BagsService', () => {
  let service: BagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BagsService],
    }).compile();

    service = module.get<BagsService>(BagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
