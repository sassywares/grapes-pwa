import { getPlatforms } from "@ionic/react";

export const isIos = !getPlatforms().includes("android");

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

export function scrollIntoViewById(id: string) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
