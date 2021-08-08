import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './entities/test.entity';
import { UpdateTestStatusDto } from './dto/update-test-status.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<Test & Document>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const test = new this.testModel({
      statusHistory: [],
      status: {
        status: 'pending',
        timestamp: Date.now(),
        userId: null,
      },
      ...createTestDto,
    });
    return test.save();
  }

  async findAll(projectId: string, status: string): Promise<Test[]> {
    const filter: any = { projectId };
    if (status != null) {
      filter['status.status'] = status;
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
    // (see also {InvalidatorsService.processInvalidationResult})
    const newStatus = {
      ...updateTestDto,
      timestamp: Date.now(),
    };

    return this.testModel.updateOne(
      { _id: id },
      {
        $set: {
          status: newStatus,
        },
        $push: {
          statusHistory: newStatus,
        },
      },
    );
  }

  async remove(id: string) {
    return this.testModel.deleteOne({ _id: id });
  }
}
