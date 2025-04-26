/**
 * Hello from `results-oriented`!
 */

/**
 * The core type of results-oriented. Either an OK<Value> or a NotOk<Fallback, Error>:
 * ```ts
 * {ok: true, result: Value} | {ok: false, result: Fallback, error?: Error}
 * ```
 * If fallback isn't provided, it will be undefined.
 */
export type Result<Value, Fallback = undefined, Error = unknown> =
  | Ok<Value>
  | NotOk<Fallback, Error>;

/**
 * A successful result.
 * ```ts
 * // Ok<SomeType>
 * {
 *  ok: true,
 *  result: SomeType
 * }
 * ```
 */
export type Ok<Value> = {
  ok: true;
  result: Value;
};

/**
 * An unsuccessful result. If Fallback is not provided, it will be undefined.
 * Error can also be provided
 * ```ts
 * // NotOk<SomeFallback, Error>
 * {
 *  ok:  false,
 *  result: SomeFallback,
 *  error: new Error('It didn't work!')
 * }
 * ```
 */
export type NotOk<Fallback = undefined, Error = unknown> = {
  ok: false;
  result: Fallback;
  error?: Error;
};

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
export const fail = <Fallback = undefined, Error = unknown>({
  value,
  error,
}: {
  value?: Fallback;
  error?: Error;
}): NotOk<Fallback, Error> => {
  return {
    ok: false,
    result: value as Fallback,
    error,
  };
};

/**
 * Helper function to create a typed Ok response.
 * @param value - (optional) - the successful return
 */
export const pass = <Value>({ value }: { value: Value }): Ok<Value> => {
  return {
    ok: true,
    result: value,
  };
};

/**
 * Hello from ResultsOriented!
 */
const ResultsOriented = {
  isOk,
  pass,
  fail,
};

export default ResultsOriented;

// Implement wrap, unwrap, pipe, encase, match

type Function<Props = unknown, Return = unknown> = (props: Props) => Return;

const safe = <P, R, F>(func: Function<P, R>, fallbackSelector?: (e: unknown) => F) => {
    return (props: P) => {
        try {
            return func(props);
        } catch (e) {
            if (fallbackSelector) {
                return fallbackSelector(e);
            }
        }
    }
}


interface PipeOptions {
    safe: boolean,
    safeFallback: <T>(e: unknown) => T,
}

const defaultPipeOptions = {
    safe: true,
    safeFallback: (e: unknown) => console.error(e),
}
//TODO: Add safeness in here, tracking of overall state
export const pipe = (...funcs: Function<unknown, unknown>[]) => {
    let first = true;
    return (props, options: PipeOptions) => {
        const _options =  {...defaultPipeOptions, ...options };
        // do something with options
        let result = undefined;
        for (const func of funcs) {
            result = func(first ? props : result);
            if (first) first = false;
        }
        return result;
    }
};

const assert = (value: unknown, message?: string) => {
    if (!value) {
       throw new Error(message);
    }
}
