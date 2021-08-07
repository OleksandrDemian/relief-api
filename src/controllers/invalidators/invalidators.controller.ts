import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { InvalidatorsService } from './invalidators.service';
import { CreateInvalidatorDto } from './dto/create-invalidator.dto';
import { UpdateInvalidatorDto } from './dto/update-invalidator.dto';
import { ProcessInvalidationResult } from './dto/process-invalidation-result';

@Controller('invalidators')
export class InvalidatorsController {
  constructor(private readonly invalidatorsService: InvalidatorsService) {}

  @Post()
  create(@Body() createInvalidatorDto: CreateInvalidatorDto) {
    return this.invalidatorsService.create(createInvalidatorDto);
  }

  @Post('/process')
  processInvalidationResult(
    @Body() processInvalidationResult: ProcessInvalidationResult,
  ) {
    return this.invalidatorsService.processInvalidationResult(
      processInvalidationResult,
    );
  }

  @Get()
  findAll() {
    return this.invalidatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invalidatorsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvalidatorDto: UpdateInvalidatorDto,
  ) {
    return this.invalidatorsService.update(+id, updateInvalidatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invalidatorsService.remove(+id);
  }
}
