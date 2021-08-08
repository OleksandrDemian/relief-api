import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateEnvironmentDto } from '../environments/dto/create-environment.dto';
import { ProjectEnvironment } from '../environments/entities/environment.entity';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('/byRepo')
  findByRepo(@Query('repoUrl') repoUrl) {
    return this.projectsService.findByRepo(repoUrl);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Post(':id/environment')
  addEnvironment(
    @Param('id') projectId: string,
    @Body() environment: CreateEnvironmentDto,
  ) {
    return this.projectsService.createEnvironment(projectId, environment);
  }

  @Get(':id/environments')
  async getEnvironments(@Param('id') projectId: string) {
    // todo: remove this method (update client) or do something with this
    const { environments } = await this.findOne(projectId);
    return environments;
  }

  @Put(':id/environment/:envId')
  async updateEnvironment(
    @Param('id') projectId: string,
    @Param('envId') environmentId: string,
    @Body() updateEnvironmentDto: UpdateEnvironmentDto,
  ) {
    return this.projectsService.updateEnvironment(
      projectId,
      environmentId,
      updateEnvironmentDto,
    );
  }

  @Delete(':id/environment/:envId')
  async deleteEnvironment(
    @Param('id') projectId: string,
    @Param('envId') environmentId: string,
  ) {
    return this.projectsService.deleteEnvironment(projectId, environmentId);
  }
}
