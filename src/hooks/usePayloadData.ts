import { useCallback, useState } from "react";
import { Boolbacks, Payload, ResponseErrors } from "@/types";

type Props<Data, Type> = {
  /**
   * A function that gets the data from the API.
   * @param {Boolbacks<Payload<Data, Type>>} boolbacks
   */
  getData: (boolbacks: Boolbacks<Payload<Data, Type>>) => void;
  /**
   * A check if the data is valid.
   */
  isDataValid: boolean;
  /**
   * A function to set the data.
   * This is useful when you want to set the data from within the hook.
   */
  setData: (data: Data | null) => void;
  /**
   * If an error needs to be shown initially, pass it here.
   */
  initialError?: ResponseErrors;
};

/**
 * A hook that fetches data and handles error and loading states.
 */
export function usePayloadData<Data, Type>({
  getData,
  setData,
  isDataValid,
  initialError = null,
}: Props<Data, Type>) {
  /**
   * Error state.
   * If there is an error, I gotta show it.
   */
  const [error, setError] = useState(initialError);

  /**
   * Loading state.
   * If there are no recipes and no error, we are loading.
   */
  const isLoading = !isDataValid && !error;

  /**
   * Get the payload and set the data.
   * Call this function whenever you want to fetch the data.
   */
  const getPayloadData = useCallback(() => {
    // In case we're not loading,
    // Which is the case when we have either recipes or an error.
    if (!isLoading) {
      // Clear both to initiate loading.
      setData(null);
      setError(null);
    }

    getData({
      onError: (errors) => {
        setData(null);
        setError(errors);
      },
      onSuccess: ({ data }) => {
        setError(null);
        setData(data);
      },
    });
  }, [getData, isLoading]);

  return {
    error,
    setError,
    isLoading,
    getPayloadData,
  };
}
