import { Environment } from '../../environments/entities/environment.entity';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Project {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  environments: Environment[];
}
