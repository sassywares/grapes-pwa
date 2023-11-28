import { NumericBoolean, Payload } from "@/types";

export type JSON = string;

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
  isLiked?: boolean;
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
  summary?: TrustedHTML;
  sustainable?: NumericBoolean;
  title: string;
  vegan?: NumericBoolean;
  vegetarian?: NumericBoolean;
  veryHealthy?: NumericBoolean;
  veryPopular?: NumericBoolean;
  weightWatcherSmartPoints?: number;
};

export type Nutrient = {
  amount: number;
} & (
  | {
      unit: "kcal";
      name: "Calories";
    }
  | {
      unit: "g";
      name: "Protein";
    }
  | {
      unit: "g";
      name: "Carbohydrates";
    }
);

export type RecipeIngredient = {
  name: string;
  image: string;
  localizedName: string;
};

export type RecipeEquipment = RecipeIngredient;

export type RecipeStep = {
  number: number;
  step: TrustedHTML;
  equipment: RecipeEquipment[];
  ingredients: RecipeIngredient[];
};

export type RecipeInstruction = {
  name: string;
  steps: RecipeStep[];
};

export type AnalyzedInstructions = RecipeInstruction[] | null;

export type RecipePayload = Payload<Recipe, "object">;
export type RecipesPayload = Payload<Recipe[], "array">;

export function isRecipe(object: any): object is Recipe {
  return object && "recipeId" in object;
}
