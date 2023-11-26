import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/modal";

// Components
import { SearchBar } from "@/components/search";
import { ExploreContainer } from "@/components/ExploreContainer";
import { HeaderSearchComponent } from "@/components/header/variants/HeaderSearchComponent";
import {
  IonPage,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItemGroup,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonText,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { Recipe, getPopularRecipes } from "@/recipe";

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
  });

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
              <IonText>
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
                  {recipes.map((recipe) => (
                    <IonCol key={recipe.recipeId}>
                      <IonCard>
                        <img
                          loading="lazy"
                          src={recipe.image}
                          alt={recipe.title}
                        />
                        <IonCardHeader>
                          <IonCardSubtitle>
                            {recipe.aggregateLikes} minutes
                          </IonCardSubtitle>
                          <IonCardTitle>{recipe.title}</IonCardTitle>
                        </IonCardHeader>
                      </IonCard>
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
