const BASE_URL = "https://dummyjson.com";

export type HttpError = Error & {status: number;};

export function createHttpError(message: string,status: number,): HttpError {
  const error = new Error(message) as HttpError;

  error.name = "HttpError";
  error.status = status;

  return error;
}

export function isHttpError(error: unknown): error is HttpError {
  return (
    error instanceof Error &&
    error.name === "HttpError" &&
    "status" in error &&
    typeof error.status === "number"
  );
}

export async function fetchJson<T>(endpoint: string,options?: RequestInit,): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw createHttpError(`Request failed: ${response.statusText}`,response.status,);
  }

  return response.json() as Promise<T>;
}