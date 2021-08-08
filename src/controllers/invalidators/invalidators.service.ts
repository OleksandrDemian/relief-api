import { Injectable } from '@nestjs/common';
import { CreateInvalidatorDto } from './dto/create-invalidator.dto';
import { UpdateInvalidatorDto } from './dto/update-invalidator.dto';
import { ProcessInvalidationResult } from './dto/process-invalidation-result';
import { TestsService } from '../tests/tests.service';

@Injectable()
export class InvalidatorsService {
  constructor(private readonly testsService: TestsService) {}

  create(createInvalidatorDto: CreateInvalidatorDto) {
    return 'This action adds a new invalidator';
  }

  async processInvalidationResult(
    processInvalidationResult: ProcessInvalidationResult,
  ) {
    // todo move to bulk update
    // the problem now is that we must run update, and if no documents where updated, the run insert
    // todo !REFACTOR THIS
    for (const invalidator of processInvalidationResult.invalidators) {
      await this.testsService.updateStatus(invalidator.value, {
        _id: processInvalidationResult.environments[0]._id,
        status: invalidator.status,
      });
    }
    return null;
  }

  findAll() {
    return `This action returns all invalidators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invalidator`;
  }

  update(id: number, updateInvalidatorDto: UpdateInvalidatorDto) {
    return `This action updates a #${id} invalidator`;
  }

  remove(id: number) {
    return `This action removes a #${id} invalidator`;
  }
}
