export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure = {
  ok: false;
  error: string;
};

// Result <T>: Generic type that forces to handle success and error cases
export type Result<T> = Success<T> | Failure;
