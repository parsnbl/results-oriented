import type { Result } from '../types';
import { pass, fail, isOk } from '../index';
import { AssertOptions } from './types';

const assert = <Exception extends Error>(
  value: unknown,
  { error, fallback }: AssertOptions<Exception>
): Result<true, typeof fallback, Exception> => {
  return value
    ? pass<true>({ result: true })
    : fail({
        error,
        result: fallback,
      });
};

export { isOk, pass, fail, assert, AssertOptions };
