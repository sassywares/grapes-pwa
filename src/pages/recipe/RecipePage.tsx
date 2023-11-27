import { FC } from "react";
import { routes } from "@/config";
import { Recipe, getRecipeById, isRecipe } from "@/recipe";
import { IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";

type Params = {
  /**
   * The ID of the recipe to display.
   */
  recipeId: string;
};

export const RecipePage: FC = () => {
  // Hooks
  const history = useHistory();
  const { recipeId } = useParams<Params>();

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
    // If the recipe is valid, set it as the recipe state.
    isValidSelectedRecipe ? selectedRecipe : null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Effect: Fetch the recipe if it isn't already in state.
   */
  useEffect(() => {
    // If the recipe is valid, return.
    if (isValidSelectedRecipe) return;

    // If the recipeId is invalid, return.
    if (!recipeId) return;

    // Otherwise, fetch the recipe.
    getRecipeById(recipeId, {
      onError: ({ message }) => {
        setIsLoading(false);
        setError(new Error(message));
      },
      onSuccess: ({ data }) => {
        setRecipe(data);
        setIsLoading(false);
      },
    });
  }, []);

  return (
    <IonPage>
      <h1>Recipe Page</h1>
    </IonPage>
  );

  if (!recipeId) return <Redirect to={routes.notFound} />;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!recipe) return <div>Recipe not found.</div>;
};
