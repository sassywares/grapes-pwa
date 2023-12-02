import { Nutrient } from "../recipeTypes";

export function useNutrients(rawNutrients?: string) {
  if (!rawNutrients) {
    return {
      carbs: undefined,
      protein: undefined,
      calories: undefined,
    };
  }

  // Nutrients
  const nutrientsList: Nutrient[] = JSON.parse(rawNutrients || "[]");

  const calories = nutrientsList.find((nutrient) => {
    return nutrient.name === "Calories";
  });

  const protein = nutrientsList.find((nutrient) => {
    return nutrient.name === "Protein";
  });

  const carbs = nutrientsList.find((nutrient) => {
    return nutrient.name === "Carbohydrates";
  });

  return {
    carbs,
    protein,
    calories,
  };
}
