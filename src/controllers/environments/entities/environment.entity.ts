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
  envId: string;
  status: string;
  repos: Repo[];
  history: EnvironmentHistoryEntry[];
}
