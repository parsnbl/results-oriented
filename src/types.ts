export type Function<Props = unknown, Return = unknown> = (
  props: Props
) => Return;

export type ResultsFunction<
  Props = unknown,
  Value = unknown,
  Fallback = unknown,
  Error = unknown,
> = (props: Props) => Result<Value, Fallback, Error>;
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
