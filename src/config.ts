export const APP_NAME = "Grape! 🍇";

export const routes = {
  home: "/",
  search: "/search",
  recipe: "/recipe/:recipeId",
  getRecipe: (recipeId: string | number) => `/recipe/${recipeId}`,
  notFound: "/not-found",
};
