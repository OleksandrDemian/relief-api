import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: SchemaFactory.createForClass(Project),
      },
    ]),
  ],
})
export class ProjectsModule {}
