// Mock data
import mockRecipes from "@cypress/fixtures/recipes.json";

// Test utils
import { Recipe, recipeConfig } from "@/recipe";
import { PopularRecipesRenderer } from "./index";
import { renderComponent, renderComponentInRouter } from "@/testUtils";

const defaultProps: Parameters<typeof PopularRecipesRenderer>[0] = {
  error: null,
  recipes: null,
  isLoading: true,
};

const renderIt = (props: Partial<typeof defaultProps> = {}) => {
  return renderComponent(PopularRecipesRenderer, defaultProps)(props);
};

describe("PopularRecipes", () => {
  it("1. Renders without crashing", () => {
    const { baseElement } = renderIt();
    expect(baseElement).toBeDefined();
  });

  it("2. Renders skeleton recipe cards when loading", () => {
    const { getAllByLabelText } = renderIt();

    // Get by aria-label="Loading"
    expect(getAllByLabelText("Loading").length).toBe(
      recipeConfig.SKELETON_CARD_COUNT
    );
  });

  it("3. Renders error message when error", () => {
    const { getByText } = renderIt({
      isLoading: false,
      error: { message: "Something went wrong" },
    });

    expect(getByText("Something went wrong")).toBeDefined();
  });

  it("4. Renders recipes when loaded", () => {
    const { getAllByRole } = renderComponentInRouter(
      PopularRecipesRenderer,
      defaultProps
    )({
      isLoading: false,
      recipes: mockRecipes as Recipe[],
    });

    // Get by aria
    expect(getAllByRole("article").length).toBe(recipeConfig.CARD_COUNT);
  });

  // TODO: Add test for clicking on a recipe card
});
