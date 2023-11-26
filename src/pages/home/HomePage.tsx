import "./HomePage.css";
import { useModal } from "@/components/modal";
import { useEffect, useRef, useState } from "react";

// Components
import {
  IonPage,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { SearchBar } from "@/components/search";
import { RecipeCard } from "@/recipe/components";
import { Recipe, getPopularRecipes } from "@/recipe";
import { HeaderSearchComponent } from "@/components/header/variants/HeaderSearchComponent";

export const HomePage: React.FC = () => {
  const { ref, dismiss } = useModal();
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<Error | null>(null);

  /**
   * This is the ID of the search button in the header.
   */
  const controlId = "searchBarControl";

  /**
   * Effect: Fetch popular recipes.
   */
  useEffect(() => {
    setTimeout(() => {
      getPopularRecipes({
        onError: ({ message }) => {
          setIsLoading(false);
          setError(new Error(message));
        },
        onSuccess: ({ data }) => {
          setRecipes(data);
          setIsLoading(false);
        },
      });
    }, 3000);
  }, []);

  return (
    <IonPage>
      <HeaderSearchComponent searchButtonId={controlId} />
      <IonContent fullscreen>
        {/* Search Modal */}
        <IonModal
          ref={ref}
          trigger={controlId}
          onIonModalDidPresent={() => searchBarRef.current?.setFocus()}
        >
          <IonHeader>
            <IonToolbar>
              <SearchBar autoFocus onClickCancel={dismiss} ref={searchBarRef} />
            </IonToolbar>
          </IonHeader>
        </IonModal>
        {/* Popular Recipes */}
        <section>
          <IonGrid>
            <IonRow className="ion-padding-horizontal">
              <IonText className="prose prose-h2:text-white">
                <h2>Popular Recipes</h2>
              </IonText>
            </IonRow>
            <IonRow>
              {isLoading ? (
                <>
                  <p>Loading...</p>
                </>
              ) : (
                <>
                  {recipes.map(({ recipeId, ...recipe }) => (
                    <IonCol key={recipeId}>
                      <RecipeCard {...recipe} recipeId={recipeId} />
                    </IonCol>
                  ))}
                </>
              )}
            </IonRow>
          </IonGrid>
        </section>
      </IonContent>
    </IonPage>
  );
};
