import { Module } from '@nestjs/common';
import { InvalidatorsService } from './invalidators.service';
import { InvalidatorsController } from './invalidators.controller';
import { TestsModule } from '../tests/tests.module';

@Module({
  controllers: [InvalidatorsController],
  providers: [InvalidatorsService],
  imports: [TestsModule],
})
export class InvalidatorsModule {}
