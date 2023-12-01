import { useState, useEffect } from "react";
import { useDebouncedFunction } from "./useDebouncedFunction";

export function useDebouncedState<T>(
  state: T,
  delay: number = 500
): [T, (value: T) => void] {
  const [value, setValue] = useState(state);
  const debouncedFunction = useDebouncedFunction(setValue, delay);

  useEffect(() => {
    debouncedFunction(state);
  }, [state, debouncedFunction]);

  return [value, setValue];
}
