import { Injectable } from '@nestjs/common';
import { CreateInvalidatorDto } from './dto/create-invalidator.dto';
import { UpdateInvalidatorDto } from './dto/update-invalidator.dto';

@Injectable()
export class InvalidatorsService {
  create(createInvalidatorDto: CreateInvalidatorDto) {
    return 'This action adds a new invalidator';
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
