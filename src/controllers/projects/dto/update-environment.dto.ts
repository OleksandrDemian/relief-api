import { PartialType } from '@nestjs/mapped-types';
import { CreateEnvironmentDto } from '../../environments/dto/create-environment.dto';

export class UpdateEnvironmentDto extends PartialType(CreateEnvironmentDto) {}
