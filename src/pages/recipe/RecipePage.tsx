import { FC } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { isValidObject, log } from "@/utils";
import { NO_INTERNET, routes } from "@/config";
import { useIsOnline, usePayloadData } from "@/hooks";
import { Recipe, getRecipeById, isRecipe } from "@/recipe";
import { RecipeDetailComponent } from "@/recipe/components";
import { Redirect, useHistory, useParams } from "react-router";
import {
  HeaderLoadingComponent,
  HeaderRecipeComponent,
  HeaderSearchComponent,
} from "@/components/header/variants";
import { PageWithSearch } from "@/components";

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

  let initialError: Error | null = null;

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
        initialError = new Error(NO_INTERNET);
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

  log({ recipe, selectedRecipe, recipeId, error, isLoading });

  /**
   * Effect: Fetch the recipe if it isn't already in state.
   */
  useEffect(() => {
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
      setError(new Error("Invalid recipe ID."));
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
      </IonPage>
    );

  if (error)
    return (
      <IonPage>
        <div>{error.message}</div>
      </IonPage>
    );

  return (
    <IonPage>
      {/* Bang! since loading stops whenever recipe or error is found, */}
      {/* And since error returns above, we got recipe for sure! */}
      <HeaderRecipeComponent
        title={recipe!.title}
        recipeId={recipe!.recipeId}
      />
      <RecipeDetailComponent {...recipe!} />
    </IonPage>
  );
}
