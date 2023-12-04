import { useState } from "react";
import { IonPage } from "@ionic/react";
import { isValidObject, log } from "@/utils";
import { NO_INTERNET, routes } from "@/config";
import { RecipeDetail, SkeletonRecipeDetail } from "@/recipe/components";
import { useHttpEffect, useIsOnline, usePayloadData } from "@/hooks";
import { Recipe, getRecipeById, isRecipe } from "@/recipe";
import { Redirect, useHistory, useParams } from "react-router";
import {
  HeaderRecipeComponent,
  HeaderLoadingComponent,
} from "@/components/header/variants";
import { PageWithError } from "@/components";
import { ResponseErrors } from "@/types";

type Params = {
  /**
   * The ID of the recipe to display.
   */
  recipeId: string;
};

export function RecipePage() {
  // Hooks
  const history = useHistory();
  const isOnline = useIsOnline();
  const { recipeId } = useParams<Params>();

  let initialError: ResponseErrors = null;

  /**
   * The recipe that was selected from the previous page.
   */
  const selectedRecipe = history.location.state;

  /**
   * Whether or not the selected recipe is valid.
   */
  const isValidSelectedRecipe = isRecipe(selectedRecipe);

  // State
  const [recipe, setRecipe] = useState<Recipe | null>(
    (() => {
      // If selectedRecipe is invalid
      if (!isValidSelectedRecipe) {
        // If we are online, return null.
        if (isOnline) {
          return null;
        }

        // If we are offline, set error and return null.
        initialError = { message: NO_INTERNET };
        return null;
      }

      // Otherwise, return the selected recipe.
      return selectedRecipe;
    })()
  );

  // Get payload data.
  const { error, setError, isLoading, getPayloadData } = usePayloadData<
    Recipe,
    "object"
  >({
    setData: setRecipe,
    isDataValid: isValidObject(recipe),
    getData: (boolbacks) => getRecipeById(recipeId, boolbacks),
  });

  log("RecipePage", { recipe, selectedRecipe, recipeId, error, isLoading });

  /**
   * Effect: Fetch the recipe if it isn't already in state.
   */
  useHttpEffect(() => {
    // We fetch only when we're online.
    if (!isOnline) {
      return;
    }

    // If the recipe is valid, return.
    if (isValidSelectedRecipe) return;

    // If the recipeId is invalid, return.
    if (!recipeId) return;

    // If id can't be parsed to number, it's a bad id.
    if (isNaN(Number(recipeId))) {
      setError({ message: "Invalid recipe ID." });
      return;
    }

    // Otherwise, fetch the recipe.
    getPayloadData();
  }, [isOnline]);

  if (!recipeId) return <Redirect to={routes.notFound} />;

  if (isLoading)
    return (
      <IonPage>
        <HeaderLoadingComponent />
        <SkeletonRecipeDetail />
      </IonPage>
    );

  if (error) return <PageWithError error={error} />;

  return (
    <IonPage>
      {/* Bang! since loading stops whenever recipe or error is found, */}
      {/* And since error returns above, we got recipe for sure! */}
      <HeaderRecipeComponent {...recipe!} />
      <RecipeDetail {...recipe!} />
    </IonPage>
  );
}
