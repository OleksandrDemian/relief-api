import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { UpdateTestStatusDto } from './dto/update-test-status.dto';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    if (!createTestDto.projectId) {
      throw new HttpException(
        'Project id is required for tests',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.testsService.create(createTestDto);
  }

  @Get()
  findAll(
    @Query('projectId') projectId: string,
    @Query('status') status: string,
  ) {
    if (!projectId) {
      throw new HttpException('Project id is required', HttpStatus.BAD_REQUEST);
    }
    // todo: validate if the user have access to the project

    return this.testsService.findAll(projectId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(id, updateTestDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTestStatusDto: UpdateTestStatusDto,
  ) {
    return this.testsService.updateStatus(id, updateTestStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testsService.remove(id);
  }
}
