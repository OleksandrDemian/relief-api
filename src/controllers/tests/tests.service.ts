import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './entities/test.entity';
import { UpdateTestStatusDto } from './dto/update-test-status.dto';

type TestsFilter = {
  projectId: string;
  status?: string;
};

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<Test & Document>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const test = new this.testModel(createTestDto);
    return test.save();
  }

  async findAll(projectId: string, status: string): Promise<Test[]> {
    const filter: TestsFilter = { projectId };
    if (status) {
      filter.status = status;
    }
    return this.testModel.find(filter);
  }

  async findOne(id: string): Promise<Test> {
    return this.testModel.findById(id);
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    return this.testModel.updateOne({ _id: id }, updateTestDto);
  }

  async updateStatus(id: string, updateTestDto: UpdateTestStatusDto) {
    return this.testModel.updateOne(
      { _id: id },
      {
        $set: {
          [`environments.${updateTestDto.envId}.status`]: updateTestDto.status,
        },
        $push: {
          [`environments.${updateTestDto.envId}.history`]: {
            timestamp: Date.now(),
            status: updateTestDto.status,
          },
        },
      },
    );
  }

  async remove(id: string) {
    return this.testModel.deleteOne({ _id: id });
  }
}
