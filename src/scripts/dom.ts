import { type Result } from "../types/result";

/**
 * Safelfy checks a DOM elelement by /**
 * Returns Result pattern instead of throwing/returning null.
 *
 * @param id - id of the element to find
 * @returns Result<T> - success with typed element
 * @error Result<string> - error with error message
 *
 */
export const queryElement = <T extends HTMLElement>(id: string): Result<T> => {
  const el = document.getElementById(id) as T | null;
  if (!el) {
    console.warn(`[render] Missing DOM element: #${id}`);
    return { ok: false, error: `Missing DOM element: #${id}` };
  }
  return { ok: true, data: el };
};
