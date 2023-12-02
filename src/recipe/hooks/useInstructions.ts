import {
  RecipeEquipment,
  RecipeIngredient,
  AnalyzedInstructions,
} from "../recipeTypes";

export function useInstructions(rawInstructions?: string) {
  if (!rawInstructions) {
    return {
      steps: [],
      equipment: [],
      ingredients: [],
    };
  }

  // Instructions
  const instructions: AnalyzedInstructions = JSON.parse(
    rawInstructions || "[]"
  );

  const steps =
    instructions && instructions.length > 0 && instructions[0].steps;

  const equipment: RecipeEquipment[] = [];
  const ingredients: RecipeIngredient[] = [];

  if (steps) {
    // Get all equipment and ingredients
    steps.forEach((step) => {
      // Add equipment if not already in list
      step.equipment.forEach((e) => {
        if (!equipment.find((eq) => eq.name === e.name)) {
          equipment.push(e);
        }
      });

      // Add ingredients if not already in list
      step.ingredients.forEach((i) => {
        if (!ingredients.find((ing) => ing.name === i.name)) {
          ingredients.push(i);
        }
      });
    });
  }

  return {
    steps,
    equipment,
    ingredients,
  };
}
