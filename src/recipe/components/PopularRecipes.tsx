import { Recipe } from "../recipeTypes";
import { useEffect, useState } from "react";

// Components
import { RecipeCard } from "./RecipeCard";
import { SkeletonRecipeCard } from "./SkeletonRecipeCard";
import { IonGrid, IonRow, IonText, IonCol } from "@ionic/react";
import { getCachedPopularRecipes, getPopularRecipes } from "../recipeApi";
import { isOnline } from "@/utils";

export function PopularRecipesGridItems() {
  // Get potential cached popular recipes.
  const probablyCachedRecipes = getCachedPopularRecipes();

  // Check if the recipes are cached.
  const areRecipesCached =
    probablyCachedRecipes && probablyCachedRecipes.data.length > 0;

  // State
  const [recipes, setRecipes] = useState<Recipe[] | null>(
    // If the recipes are cached and the user is offline, return the cached recipes.
    areRecipesCached && !isOnline() ? probablyCachedRecipes.data : null
  );

  /**
   * Recipes are valid if they are an array.
   */
  const areRecipesValid = Array.isArray(recipes);

  /**
   * Error state.
   * If there is an error, I'll show it.
   */
  const [error, setError] = useState<Error | null>(null);

  /**
   * isLoading when either the recipes are invalid or there is an error.
   */
  const isLoading = !areRecipesValid || error !== null;

  /**
   * Effect: Fetch popular recipes.
   */
  useEffect(() => {
    // If we have valid recipes, return.
    if (areRecipesValid) return;

    setTimeout(() => {
      getPopularRecipes({
        onError: ({ message }) => {
          setError(new Error(message));
        },
        onSuccess: ({ data }) => {
          setRecipes(data);
        },
      });
    }, 3000);
  }, []);

  if (isLoading) {
    return [...Array(10)].map((_, index) => (
      <IonCol key={index}>
        <SkeletonRecipeCard />
      </IonCol>
    ));
  }

  if (!areRecipesValid) {
    return (
      <IonCol>
        <IonText className="prose prose-h3:text-white">
          <p>There are no recipes to show.</p>
        </IonText>
      </IonCol>
    );
  }

  return (recipes as Recipe[]).map(({ recipeId, ...recipe }) => (
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
            <h2>Popular Recipes</h2>
          </IonText>
        </IonRow>
        <IonRow>
          <PopularRecipesGridItems />
        </IonRow>
      </IonGrid>
    </section>
  );
}
