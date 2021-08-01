import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model, Types } from 'mongoose';
import { CreateEnvironmentDto } from '../environments/dto/create-environment.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project & Document>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find();
  }

  async findOne(id: string) {
    return this.projectModel.findById(id);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.updateOne({ _id: id }, updateProjectDto);
  }

  async remove(id: string) {
    return this.projectModel.deleteOne({ _id: id });
  }

  async createEnvironment(
    projectId: string,
    environment: CreateEnvironmentDto,
  ) {
    return this.projectModel.updateOne(
      { _id: projectId },
      {
        $push: {
          environments: {
            ...environment,
            _id: Types.ObjectId(),
          },
        },
      },
    );
  }
}
