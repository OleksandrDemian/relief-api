import { Environment } from '../../environments/entities/environment.entity';

export class CreateTestDto {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  projectId: string;
  environments: Environment[];
}
