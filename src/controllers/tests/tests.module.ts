import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Test } from './entities/test.entity';

@Module({
  controllers: [TestsController],
  providers: [TestsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Test.name,
        schema: SchemaFactory.createForClass(Test),
      },
    ]),
  ],
  exports: [TestsService],
})
export class TestsModule {}
