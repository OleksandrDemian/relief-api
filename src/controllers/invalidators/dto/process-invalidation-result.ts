class InvalidationResultMeta {
  timestamp: number;
}

class InvalidationEnvironment {
  _id: string;
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
