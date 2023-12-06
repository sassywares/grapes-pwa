import { useState, useEffect } from "react";
import { useDebouncedFunction } from "./useDebouncedFunction";

export const useMediaQuery = (query: string): boolean => {
  const mediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryList.matches);
  const debouncedSetMatches = useDebouncedFunction(setMatches, 500);

  useEffect(() => {
    const updateMatches = () => debouncedSetMatches(mediaQueryList.matches);

    // Initial check
    updateMatches();

    // Add listener for changes
    mediaQueryList.addEventListener("change", updateMatches);

    // Cleanup on unmount
    return () => {
      mediaQueryList.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
};
