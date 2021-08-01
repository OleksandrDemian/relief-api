export class EnvironmentHistoryEntry {
  status: string;
  userId: string;
  timestamp: number;
}

export class Environment {
  envId: string;
  status: string;
  history: EnvironmentHistoryEntry[];
}
