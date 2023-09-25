import { Test, TestingModule } from '@nestjs/testing';
import { ProductimagesController } from './productimages.controller';
import { ProductimagesService } from './productimages.service';

describe('ProductimagesController', () => {
  let controller: ProductimagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductimagesController],
      providers: [ProductimagesService],
    }).compile();

    controller = module.get<ProductimagesController>(ProductimagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
