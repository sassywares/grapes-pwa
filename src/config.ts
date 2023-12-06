import { Recipe } from "./recipe";

export const APP_NAME = "Grape! 🍇";
export const APP_EMAIL = "grape@sassywares.com";

// URLs
export const SASSYWARES_URL = "https://sassywares.com?utm_source=grape";
export const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.sassywares.grape";
export const APPSTORE_URL =
  "https://apps.apple.com/us/app/grape-recipes/id1560224479";
export const ROADMAP_URL =
  "https://sassywares.notion.site/Grape-Roadmap-4157ef32a3f6497c8e2cbe993f36c6d2?pvs=4";
export const ABOUT_URL = "https://sassywares.com/about";

// Strings
export const NO_INTERNET =
  "You are offline, please connect to the internet to continue.";

export const routes = {
  home: "/",
  search: "/search",
  recipe: "/recipe/:recipeId",
  getRecipe: (recipe: Recipe, params?: string) => ({
    state: recipe,
    pathname: `/recipe/${recipe.recipeId}${params ? `?${params}` : ""}`,
  }),
  notFound: "/not-found",
};
