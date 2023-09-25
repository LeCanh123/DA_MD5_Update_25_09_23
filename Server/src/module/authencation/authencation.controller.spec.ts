import { Test, TestingModule } from '@nestjs/testing';
import { AuthencationController } from './authencation.controller';
import { AuthencationService } from './authencation.service';

describe('AuthencationController', () => {
  let controller: AuthencationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthencationController],
      providers: [AuthencationService],
    }).compile();

    controller = module.get<AuthencationController>(AuthencationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
