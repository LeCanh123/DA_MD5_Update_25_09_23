import { Test, TestingModule } from '@nestjs/testing';
import { ProductimagesService } from './productimages.service';

describe('ProductimagesService', () => {
  let service: ProductimagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductimagesService],
    }).compile();

    service = module.get<ProductimagesService>(ProductimagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
