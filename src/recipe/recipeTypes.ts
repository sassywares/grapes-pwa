import { HTML, NumericBoolean, Payload } from "@/types";

export type Recipe = {
  aggregateLikes?: number;
  analyzedInstructions?: JSON;
  author?: any;
  cheap?: NumericBoolean;
  cookingMinutes?: number;
  cuisines?: JSON;
  dairyFree?: NumericBoolean;
  diets?: JSON;
  dishTypes?: JSON;
  glutenFree?: NumericBoolean;
  healthScore?: number;
  image?: string;
  imageType?: string;
  license?: any;
  lowFodmap?: NumericBoolean;
  nutrients?: JSON;
  occasions?: JSON;
  preparationMinutes?: number;
  pricePerServing?: number;
  readyInMinutes?: number;
  recipeId: number;
  servings?: number;
  sourceUrl?: string;
  summary?: HTML;
  sustainable?: NumericBoolean;
  title: string;
  vegan?: NumericBoolean;
  vegetarian?: NumericBoolean;
  veryHealthy?: NumericBoolean;
  veryPopular?: NumericBoolean;
  weightWatcherSmartPoints?: number;
};

export type RecipePayload = Payload<Recipe, "object">;
export type RecipesPayload = Payload<Recipe[], "array">;