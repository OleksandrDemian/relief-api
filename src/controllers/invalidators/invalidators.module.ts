import { Module } from '@nestjs/common';
import { InvalidatorsService } from './invalidators.service';
import { InvalidatorsController } from './invalidators.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Test } from '../tests/entities/test.entity';

@Module({
  controllers: [InvalidatorsController],
  providers: [InvalidatorsService],
  // todo: same as tests, create shared module to export once all the mongodb models
  imports: [
    MongooseModule.forFeature([
      {
        name: Test.name,
        schema: SchemaFactory.createForClass(Test),
      },
    ]),
  ],
})
export class InvalidatorsModule {}
