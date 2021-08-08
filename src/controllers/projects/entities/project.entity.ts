import { Prop, Schema } from '@nestjs/mongoose';
import { Repository } from './repository.entity';

@Schema()
export class Project {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  environments: Repository[];
}
