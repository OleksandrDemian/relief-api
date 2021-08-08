import { Prop, Schema } from '@nestjs/mongoose';
import { TestEnvironment } from '../../environments/entities/environment.entity';

@Schema()
export class Test {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  shortDescription: string;
  @Prop()
  description: string;
  @Prop()
  projectId: string;
  @Prop()
  environments: TestEnvironment[];
}
