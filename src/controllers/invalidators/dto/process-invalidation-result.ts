class InvalidationResultMeta {
  timestamp: number;
}

class InvalidationEnvironment {
  envId: string;
  projectId: string;
}

class Invalidator {
  value: string;
  type: string;
  status: string;
}

export class ProcessInvalidationResult {
  meta: InvalidationResultMeta;
  environments: InvalidationEnvironment[];
  invalidators: Invalidator[];
}
