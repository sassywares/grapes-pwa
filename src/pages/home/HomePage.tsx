import "./HomePage.css";
import { HeroSection } from "./HeroSection";
import { PageWithSearch } from "@/components";
import { PopularRecipes } from "@/recipe/components";

export const HomePage: React.FC = () => {
  return (
    <PageWithSearch>
      <>
        <HeroSection />
        {/* Popular Recipes */}
        <PopularRecipes />
      </>
    </PageWithSearch>
  );
};
