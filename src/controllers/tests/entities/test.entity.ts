import { Prop, Schema } from '@nestjs/mongoose';
import { TestStatusHistory } from './testStatusHistory.entity';

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
  statusHistory: TestStatusHistory[];
  @Prop()
  status: TestStatusHistory;
}
