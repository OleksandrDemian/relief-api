import { Module } from '@nestjs/common';
import { InvalidatorsService } from './invalidators.service';
import { InvalidatorsController } from './invalidators.controller';

@Module({
  controllers: [InvalidatorsController],
  providers: [InvalidatorsService]
})
export class InvalidatorsModule {}
