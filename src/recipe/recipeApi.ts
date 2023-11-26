import { Boolbacks, Response } from "@/types";
import { RecipesPayload } from "./recipeTypes";

const defaultError = { message: "Something went wrong" };

export function getPopularRecipes({
  onSuccess,
  onError,
}: Boolbacks<RecipesPayload>) {
  fetch(`${import.meta.env.VITE_API}/recipes/popular`)
    .then((r) => r.json())
    .then(
      ({
        status,
        payload,
        errors = defaultError,
      }: Response<RecipesPayload>) => {
        if (status === 200) {
          onSuccess?.(payload);
        } else {
          onError?.(errors);
        }
      }
    )
    .catch((e) => {
      console.error(e);
      onError?.(defaultError);
    });
}
