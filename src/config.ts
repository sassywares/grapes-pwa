import { Recipe } from "./recipe";

export const APP_NAME = "Grape! 🍇";
export const APP_EMAIL = "begrape@sassywares.com";
export const NO_INTERNET =
  "You are offline, please connect to the internet to continue.";

export const routes = {
  home: "/",
  search: "/search",
  recipe: "/recipe/:recipeId",
  getRecipe: (recipe: Recipe) => ({
    state: recipe,
    pathname: `/recipe/${recipe.recipeId}`,
  }),
  notFound: "/not-found",
};
