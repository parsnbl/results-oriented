export type Result<Value, Fallback = undefined> = Ok<Value> | NotOk<Fallback>;

export type Ok<Value> = {
  ok: true;
  result: Value;
};

export type NotOk<Fallback = undefined> = {
  ok: false;
  result: Fallback;
};

const isOk = <Value, Fallback = undefined>(
  result: Result<Value, Fallback>
): result is Ok<Value> => {
  return result.ok;
};

export const fail = <T = undefined>(Fallback?: T): NotOk<T> => {
  return {
    ok: false,
    result: Fallback as T,
  };
};

export const pass = <T>(Value: T): Ok<T> => {
  return {
    ok: true,
    result: Value,
  };
};

export default {
  pass,
  fail,
  isOk,
};

// Implement wrap, unwrap, pipe, encase, match
