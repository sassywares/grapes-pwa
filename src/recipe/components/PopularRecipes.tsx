import { NO_INTERNET } from "@/config";
import { Recipe } from "../recipeTypes";
import { useEffect, useState } from "react";
import { useIsOnline } from "@/hooks/useIsOnline";
import { getCachedPopularRecipes, getPopularRecipes } from "../recipeApi";

// Components
import { RecipeCard } from "./RecipeCard";
import { SkeletonRecipeCard } from "./SkeletonRecipeCard";
import { IonGrid, IonRow, IonText, IonCol } from "@ionic/react";

export function PopularRecipesGridItems() {
  const isOnline = useIsOnline();

  let initialError: Error | null = null;

  // Get potential cached popular recipes.
  const probablyCachedRecipes = getCachedPopularRecipes();

  // Check if the recipes are cached.
  const areRecipesCached =
    probablyCachedRecipes && probablyCachedRecipes.data.length > 0;

  // State
  const [recipes, setRecipes] = useState<Recipe[] | null>(
    (() => {
      // No need to show cache if we are online.
      if (isOnline) {
        console.log("We are online, no need to show cache.");
        return null;
      }

      // Offline and not cached
      if (!areRecipesCached) {
        // Set error state.
        console.log("We are offline and not cached.");
        initialError = new Error(NO_INTERNET);
        return null;
      }

      // Offline and cached
      console.log("We are offline and cached.");
      return probablyCachedRecipes.data;
    })()
  );

  /**
   * Recipes are valid if they are an array.
   */
  const areRecipesValid = recipes !== null && Array.isArray(recipes);

  /**
   * Error state.
   * If there is an error, I gotta show it.
   */
  const [error, setError] = useState(initialError);

  /**
   * Loading state.
   * If there are no recipes and no error, we are loading.
   */
  const isLoading = !areRecipesValid && !error;

  /**
   * Effect: Fetch popular recipes.
   */
  useEffect(() => {
    // We fetch only when we're online.
    if (!isOnline) {
      return;
    }

    // In case we're not loading,
    // Which is the case when we have either recipes or an error.
    if (!isLoading) {
      // Clear both to initiate loading.
      setError(null);
      setRecipes(null);
    }

    setTimeout(() => {
      getPopularRecipes({
        onError: ({ message }) => {
          setRecipes(null);
          setError(new Error(message));
        },
        onSuccess: ({ data }) => {
          setError(null);
          setRecipes(data);
        },
      });
    }, 3000);
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
      <IonCol>
        <IonText className="prose prose-h3:text-white">
          <p>{error.message}</p>
        </IonText>
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
    <section>
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
