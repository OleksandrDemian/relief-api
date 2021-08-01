import { Test, TestingModule } from '@nestjs/testing';
import { InvalidatorsService } from './invalidators.service';

describe('InvalidatorsService', () => {
  let service: InvalidatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvalidatorsService],
    }).compile();

    service = module.get<InvalidatorsService>(InvalidatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
