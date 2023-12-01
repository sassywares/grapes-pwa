import { useEffect, useCallback } from "react";

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * A simple debounce hook.
 * @param {function} func The function to debounce.
 * @param {number} timeout The timeout duration.
 * @returns {function} The debounced function.
 */
export function useDebouncedFunction<T extends (...args: any[]) => any>(
  func: T,
  timeout: number = 500
): DebouncedFunction<T> {
  /**
   * The timer.
   * Will be cleared and reset on each function call.
   */
  let timer: NodeJS.Timeout;

  const debouncedFunction = useCallback<DebouncedFunction<T>>(
    (...args: Parameters<T>) => {
      // Clear the previous timer
      clearTimeout(timer);

      // Start a new timer
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    },
    [func, timeout]
  );

  useEffect(() => {
    // Clear the timeout on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return debouncedFunction;
}
