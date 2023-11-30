import { useEffect, useState } from "react";
import { NO_INTERNET } from "@/config";
import { useIsOnline, usePayloadData } from "@/hooks";
import { isValidArray, isValidObject, log } from "@/utils";
import { getCachedPopularRecipes, getPopularRecipes } from "../recipeApi";

// Components
import { Recipe } from "../recipeTypes";
import { RecipeCard } from "./RecipeCard";
import { SkeletonRecipeCard } from "./SkeletonRecipeCard";
import { IonGrid, IonRow, IonText, IonCol } from "@ionic/react";

export function PopularRecipesGridItems() {
  const isOnline = useIsOnline();

  /**
   * Initially, there is no error
   */
  let initialError: Error | null = null;

  /**
   * The cached recipes, might be null.
   */
  const probablyCachedData = getCachedPopularRecipes();

  // State
  const [recipes, setRecipes] = useState<Recipe[] | null>(
    (() => {
      // No need to show cache if we are online.
      if (isOnline) {
        log("We are online, no need to show cache.");
        return null;
      }

      // Offline and not cached
      if (!isValidObject(probablyCachedData)) {
        // Set error state.
        log("We are offline and not cached.");
        initialError = new Error(NO_INTERNET);
        return null;
      }

      // Offline and cached
      log("We are offline and cached.");
      return probablyCachedData.data;
    })()
  );

  // Get payload data.
  const { error, isLoading, getPayloadData } = usePayloadData<
    Recipe[],
    "array"
  >({
    initialError,
    setData: setRecipes,
    getData: getPopularRecipes,
    isDataValid: isValidArray(recipes),
  });

  /**
   * Effect: Fetch popular recipes.
   */
  useEffect(() => {
    // We fetch only when we're online.
    if (!isOnline) {
      return;
    }

    // Get payload data.
    getPayloadData();
  }, [isOnline]);

  /**
   * Possible cases.
   * 1. Loading
   * 2. Error
   * 3. Success (recipes, no error)
   */

  // 1. Loading
  if (isLoading) {
    return [...Array(10)].map((_, index) => (
      <IonCol key={index}>
        <SkeletonRecipeCard />
      </IonCol>
    ));
  }

  // 2. Error
  if (error) {
    return (
      <IonCol className="!w-full !max-w-full">
        <p role="alert" className="text-center">
          {error.message}
        </p>
      </IonCol>
    );
  }

  return recipes?.map(({ recipeId, ...recipe }) => (
    <IonCol key={recipeId}>
      <RecipeCard {...recipe} recipeId={recipeId} />
    </IonCol>
  ));
}

export function PopularRecipes() {
  return (
    <section id="popularRecipes" className="container">
      <IonGrid>
        <IonRow className="ion-padding-horizontal">
          <IonText className="prose prose-h2:text-white">
            <h2>Snacks grape people love 🧡</h2>
          </IonText>
        </IonRow>
        <IonRow>
          <PopularRecipesGridItems />
        </IonRow>
      </IonGrid>
    </section>
  );
}
