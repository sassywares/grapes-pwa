export function log(...params: any[]) {
  if (import.meta.env.DEV) {
    console.log("[DEV]", ...params);
  }
}

export function isValidArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isValidObject(
  value: unknown
): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}
