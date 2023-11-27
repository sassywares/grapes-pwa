export function log(...params: any[]) {
  if (import.meta.env.DEV) {
    console.log(...params);
  }
}
