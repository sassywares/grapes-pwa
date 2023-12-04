// Mock data
import mockRecipes from "@cypress/fixtures/recipes.json";

// Test utils
import { Recipe } from "@/recipe";
import { renderComponent } from "@/testUtils";
import {
  RecipeSearchModalRenderer,
  RecipeSearchModalRendererProps,
} from "./RecipeSearchModalRenderer";

const defaultProps: RecipeSearchModalRendererProps = {
  error: null,
  isLoading: true,
  suggestions: null,
  onDismiss: () => {},
};

const renderIt = (props: Partial<RecipeSearchModalRendererProps> = {}) => {
  return renderComponent(RecipeSearchModalRenderer, defaultProps)(props);
};

describe("SearchModal", () => {
  it("1. Renders without crashing", () => {
    const { baseElement } = renderIt();
    expect(baseElement).toBeDefined();
  });

  it("2. Renders loading message when loading", () => {
    const { getByText } = renderIt();
    expect(getByText("Loading...")).toBeDefined();
  });

  it("3. Renders error message when error", () => {
    const { getByText } = renderIt({
      isLoading: false,
      error: { message: "", search: "Not Found" },
    });

    expect(getByText("Not Found")).toBeDefined();
  });

  it("4. Renders suggestions when suggestions", () => {
    const { getAllByRole } = renderIt({
      isLoading: false,
      suggestions: mockRecipes as Recipe[],
    });

    expect(getAllByRole("link")).toHaveLength(mockRecipes.length);
  });
});
