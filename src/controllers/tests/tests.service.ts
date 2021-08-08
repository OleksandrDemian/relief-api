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
    const test = new this.testModel(createTestDto);
    return test.save();
  }

  async findAll(projectId: string, status: string): Promise<Test[]> {
    const filter: any = { projectId };
    if (status != null) {
      filter['environments.status'] = status;
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
    // todo: refactor this or check if it is ok for performance
    // todo !REFACTOR THIS
    // (see also {InvalidatorsService.processInvalidationResult})
    const result = await this.testModel.updateOne(
      { _id: id },
      {
        $set: {
          'environments.$[elem].status': updateTestDto.status,
        },
        $push: {
          'environments.$[elem].history': {
            timestamp: Date.now(),
            status: updateTestDto.status,
          },
        },
      },
      {
        arrayFilters: [
          {
            'elem._id': updateTestDto._id,
          },
        ],
      },
    );

    if (result.nModified === 0) {
      // if no files were updated it means that the environment is not created yet
      // create environment
      // todo: check if there is a way to do upsert instead of running the query again
      return this.testModel.updateOne(
        { _id: id },
        {
          $push: {
            environments: {
              ...updateTestDto,
              history: [],
            },
          },
        },
      );
    }

    return result;
  }

  async remove(id: string) {
    return this.testModel.deleteOne({ _id: id });
  }
}
