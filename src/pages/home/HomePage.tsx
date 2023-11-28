import "./HomePage.css";
import { PageWithSearch } from "@/components";
import { PopularRecipes } from "@/recipe/components";

export const HomePage: React.FC = () => {
  return (
    <PageWithSearch>
      {/* Popular Recipes */}
      <PopularRecipes />
    </PageWithSearch>
  );
};
