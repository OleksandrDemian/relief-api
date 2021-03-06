import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestsModule } from '../tests/tests.module';
import { ProjectsModule } from '../projects/projects.module';
import { InvalidatorsModule } from '../invalidators/invalidators.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TestsModule,
    ProjectsModule,
    InvalidatorsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/?readPreference=primary&ssl=false'),
  ],
})
export class AppModule {}
