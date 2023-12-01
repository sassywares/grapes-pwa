import { log } from "@/utils";
import { useState } from "react";
import { NO_INTERNET } from "@/config";
import { Recipe, getRecipesByQuery } from "@/recipe";
import {
  useIsOnline,
  useHttpEffect,
  usePayloadData,
  useDebouncedFunction,
} from "@/hooks";

type Props = {
  children: (params: {
    query: string;
    isLoading: boolean;
    error: Error | null;
    suggestions: Recipe[] | null;
    onChangeListener: (e: CustomEvent) => void;
  }) => React.ReactNode;
};

// 0. ✅ setup suggestions and query states
// 1. Show searched recipes
// 2. Show loading
// 3. Show errors

export function SearchProvider({ children }: Props) {
  const isOnline = useIsOnline();
  let initialError: Error | null = null;

  /**
   * The searched query.
   * Will be used in an effect to fetch recipes.
   */
  const [query, setQuery] = useState<string>("");

  /**
   * The suggestions for the searched query.
   * Will be used to render the suggestions.
   */
  const [suggestions, setSuggestions] = useState<Recipe[] | null>(
    (() => {
      // If not online, set the initial error.
      if (!isOnline) {
        initialError = new Error(NO_INTERNET);
        return null;
      }

      // Otherwise, return an empty array.
      return [];
    })()
  );

  /**
   * A debounced variant of the same function.
   * Debounced in order to avoid unnecessary API calls.
   */
  const debouncedGetRecipesByQuery = useDebouncedFunction(getRecipesByQuery);

  /**
   * Instantiate the loading, error, and data fetching logic using usePayloadData.
   */
  const { error, isLoading, getPayloadData } = usePayloadData<
    Recipe[],
    "array"
  >({
    initialError,
    setData: setSuggestions,
    // Suggestions are valid if they are an array.
    isDataValid: Array.isArray(suggestions),
    // getData handles the boolbacks so we don't have to.
    // Pass them and the query to the debounced function.
    getData: (boolbacks) => debouncedGetRecipesByQuery(query, boolbacks),
  });

  const onChangeListener = (e: CustomEvent) => {
    // @ts-ignore
    setQuery(e.target.value);
  };

  /**
   * Effect: Fetch recipes when the query changes or when the user comes online.
   */
  useHttpEffect(() => {
    if (!isOnline) return;

    // If the query is empty or less than 3 characters, return.
    if (!query || query.length < 3) return;

    // Otherwise, fetch the recipes.
    getPayloadData();
  }, [isOnline, query]);

  log("SearchProvider", { suggestions });

  return children({ query, error, isLoading, suggestions, onChangeListener });
}
