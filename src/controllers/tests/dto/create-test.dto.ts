import { TestEnvironment } from '../../environments/entities/environment.entity';

export class CreateTestDto {
  name: string;
  shortDescription: string;
  description: string;
  projectId: string;
  environments: TestEnvironment[];
}
