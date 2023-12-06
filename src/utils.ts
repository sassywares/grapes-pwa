import { Theme } from "./types";
import { getPlatforms } from "@ionic/react";

const platforms = getPlatforms();
export const isIos = !platforms.includes("android");
export const isDesktop = platforms.includes("desktop");

/**
 * console.log but only during development.
 * Uses the NODE_ENV environment variable to check if the app is in development.
 */
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

export function setTheme(theme: Theme) {
  [document.documentElement, document.body].forEach((element) => {
    element.classList.remove("light", "dark");

    // System would mean the theme is set to the system preference.
    if (theme === "system") {
      // If the system preference is dark, add the dark theme.
      // The reason why we aren't just recursively calling setTheme("dark") is
      // because that would make the theme be dark, not system. Which means that
      // if the user changes their system preference to light, the theme would
      // still be dark.
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        element.classList.add("dark");
      }
      // Otherwise, add the light theme.
      else {
        element.classList.add("light");
      }
    }

    // Otherwise, add the provided theme.
    element.classList.add(theme);
  });

  localStorage.setItem("theme", theme);
}

export function getTheme(): Theme {
  const theme = localStorage.getItem("theme");

  // If light or dark, return it.
  if (theme === "light" || theme === "dark") {
    return theme;
  }

  // In case of system, check if the user has a preference.
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "system";
}
