export const APP_NAME = "Grape! 🍇";
export const APP_EMAIL = "begrape@sassywares.com";
export const NO_INTERNET =
  "You are offline, please connect to the internet to continue.";

export const routes = {
  home: "/",
  search: "/search",
  recipe: "/recipe/:recipeId",
  getRecipe: (recipeId: string | number) => `/recipe/${recipeId}`,
  notFound: "/not-found",
};
