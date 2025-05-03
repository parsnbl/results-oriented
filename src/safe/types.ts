export interface AssertOptions<Exception extends Error | string> {
  error: Exception;
  fallback?: unknown;
}
