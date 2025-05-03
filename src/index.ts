import { Ok, NotOk, Result, Function, ResultsFunction } from './types';
/**
 * Determine if a result object is Ok. Acts as a type-guard for whether functions succeed or fail.
 *
 * ```ts
 * const result: Result<MyType, undefined, Error> = await someFuncThatCouldBeNotOk();
 * if (isOk(result)){
 *  // result is typed as OK<MyType>, do stuff with it here
 * } else {
 *  // result is typed as NotOk<undefined, Error>, handle it
 * }
 * ```
 * @param result
 */
const isOk = <Value, Fallback = undefined, Error = unknown>(
  result: Result<Value, Fallback, Error>
): result is Ok<Value> => {
  return result.ok;
};

/**
 * Helper function to create a typed NotOk response.
 * @param fallback - (optional) - fallback value to return
 * @param error - (optional) - an error response object to pass through for downstream error handling
 */
const fail = <Fallback = undefined, Error = unknown>({
  result,
  error,
}: {
  result?: Fallback;
  error?: Error;
}): NotOk<Fallback, Error> => {
  return {
    ok: false,
    result: result as Fallback,
    error,
  };
};

/**
 * Helper function to create a typed Ok response.
 * @param value - (optional) - the successful return
 */
const pass = <Value>({ result }: { result: Value }): Ok<Value> => {
  return {
    ok: true,
    result: result,
  };
};

const makeSafe = <Props, Result, Fallback>(
  func: Function<Props, Result>,
  fallbackSelector?: (e: unknown) => Fallback
) => {
  return (props: Props) => {
    try {
      return pass({ result: func(props) });
    } catch (error) {
      return fail({
        result: fallbackSelector ? fallbackSelector(error) : undefined,
        error,
      });
    }
  };
};

const makeUnsafe = <Props, Result>(func: ResultsFunction<Props, Result>) => {
  return (props: Props) => {
    const evaluated = func(props);
    if (isOk(evaluated)) {
      return evaluated.result;
    } else {
      throw evaluated.error;
    }
  };
};

const pipe = (...funcs: Function<unknown, unknown>[]) => {
  let first = true;
  return (props: unknown) => {
    let result = undefined;
    for (const func of funcs) {
      result = func(first ? props : result);
      if (first) first = false;
    }
    return result;
  };
};

const assert = (value: unknown, { error }: { error: Error | string }) => {
  if (!value) {
    throw error instanceof Error ? error : new Error(error);
  }
};

export { isOk, fail, pass, pipe, assert, makeSafe, makeUnsafe };
export type { Ok, NotOk, Result, Function, ResultsFunction };
