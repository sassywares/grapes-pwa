import { Boolbacks, Response } from "@/types";
import { Recipe, RecipePayload, RecipesPayload } from "./recipeTypes";

const defaultError = { message: "Something went wrong" };

export function isRecipeLiked(id: Recipe["recipeId"]): boolean {
  const recipe = getCachedRecipe(id);

  if (!recipe || !recipe.isLiked) return false;

  return recipe.isLiked;
}

export function cacheRecipeLike(recipe: Recipe) {
  cacheRecipe({ ...recipe, isLiked: true });
}

export function cacheRecipeDislike(recipe: Recipe) {
  cacheRecipe({ ...recipe, isLiked: false });
}

/**
 * Caches the popular recipes in the local storage
 * Useful for when the user is offline
 */
export function cachePopularRecipes(recipes: RecipesPayload) {
  localStorage.setItem("popularRecipes", JSON.stringify(recipes));
}

/**
 * Gets the cached popular recipes
 * @returns {RecipesPayload | null} The cached recipes or null if there are none
 */
export function getCachedPopularRecipes(): RecipesPayload | null {
  const cached = localStorage.getItem("popularRecipes");

  if (!cached) return null;

  return JSON.parse(cached);
}

/**
 * Caches a recipe in the local storage
 * Useful for when the user is offline
 */
export function cacheRecipe(recipe: Recipe) {
  localStorage.setItem(`recipe-${recipe.recipeId}`, JSON.stringify(recipe));
}

/**
 * Gets a cached recipe
 * @param {string | number} id The id of the recipe to get
 */
export function getCachedRecipe(id: string | number): Recipe | null {
  const cached = localStorage.getItem(`recipe-${id}`);

  if (!cached) return null;

  return JSON.parse(cached);
}

/**
 * Gets the popular recipes from the API if not cached.
 */
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
          // Cache the recipes
          cachePopularRecipes(payload);

          // Return the recipes
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

/**
 * Gets a recipe by its id
 * @param {string} id The id of the recipe to get
 */
export function getRecipeById(
  id: string,
  { onSuccess, onError }: Boolbacks<RecipePayload>
) {
  fetch(`${import.meta.env.VITE_API}/recipes/${id}`)
    .then((r) => r.json())
    .then(
      ({ status, payload, errors = defaultError }: Response<RecipePayload>) => {
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
