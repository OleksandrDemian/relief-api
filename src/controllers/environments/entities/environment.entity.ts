export class EnvironmentHistoryEntry {
  status: string;
  userId: string;
  timestamp: number;
}

export class Repo {
  url: string;
  branch: string;
}

export class Environment {
  _id: string;
  status: string;
}

export class ProjectEnvironment extends Environment {
  repos: Repo[];
}

export class TestEnvironment extends Environment {
  history: EnvironmentHistoryEntry[];
}
