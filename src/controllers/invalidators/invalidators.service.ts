import { Injectable } from '@nestjs/common';
import { CreateInvalidatorDto } from './dto/create-invalidator.dto';
import { UpdateInvalidatorDto } from './dto/update-invalidator.dto';
import { ProcessInvalidationResult } from './dto/process-invalidation-result';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from '../tests/entities/test.entity';
import { Model } from 'mongoose';

@Injectable()
export class InvalidatorsService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<Test & Document>,
  ) {}

  create(createInvalidatorDto: CreateInvalidatorDto) {
    return 'This action adds a new invalidator';
  }

  async processInvalidationResult(
    processInvalidationResult: ProcessInvalidationResult,
  ) {
    // todo process invalidation: update invalidated test across multiple projects
    console.log(JSON.stringify(processInvalidationResult));
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
