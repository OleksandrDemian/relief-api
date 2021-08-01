import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestsModule } from '../tests/tests.module';
import { ProjectsModule } from '../projects/projects.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { InvalidatorsModule } from '../invalidators/invalidators.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TestsModule, ProjectsModule, EnvironmentsModule, InvalidatorsModule],
})
export class AppModule {}
