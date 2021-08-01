import { PartialType } from '@nestjs/mapped-types';
import { CreateInvalidatorDto } from './create-invalidator.dto';

export class UpdateInvalidatorDto extends PartialType(CreateInvalidatorDto) {}
