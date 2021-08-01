import { Test, TestingModule } from '@nestjs/testing';
import { InvalidatorsController } from './invalidators.controller';
import { InvalidatorsService } from './invalidators.service';

describe('InvalidatorsController', () => {
  let controller: InvalidatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvalidatorsController],
      providers: [InvalidatorsService],
    }).compile();

    controller = module.get<InvalidatorsController>(InvalidatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
