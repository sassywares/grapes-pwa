import { useState } from "react";
import { Boolbacks, Payload } from "@/types";

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
  initialError?: Error | null;
};

/**
 * A hook that stays in sync with network connectivity, fetches data, caches it, and re-fetches it when the network is back.
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
  function getPayloadData() {
    // In case we're not loading,
    // Which is the case when we have either recipes or an error.
    if (!isLoading) {
      // Clear both to initiate loading.
      setData(null);
      setError(null);
    }

    setTimeout(() => {
      getData({
        onError: ({ message }) => {
          setData(null);
          setError(new Error(message));
        },
        onSuccess: ({ data }) => {
          setError(null);
          setData(data);
        },
      });
    }, 3000);
  }

  return {
    error,
    setError,
    isLoading,
    getPayloadData,
  };
}
