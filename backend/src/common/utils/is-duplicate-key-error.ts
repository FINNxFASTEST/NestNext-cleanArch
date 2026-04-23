export interface MongoDuplicateKeyError {
  code: 11000;
  keyPattern?: Record<string, number>;
  keyValue?: Record<string, unknown>;
  message: string;
}

export function isDuplicateKeyError(
  err: unknown,
): err is MongoDuplicateKeyError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    err.code === 11000
  );
}
