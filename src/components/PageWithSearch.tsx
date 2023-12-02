import { log } from "@/utils";
import { useModal } from "./modal";
import { useHistory } from "react-router";
import { ReactNode, useRef } from "react";

// Components
import {
  IonPage,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { SearchBar } from "./search";
import { SearchProvider } from "./search/SearchProvider";
import { HeaderSearchComponent } from "./header/variants";
import { routes } from "@/config";
import { useNutrients } from "@/recipe/hooks";

type Props = {
  children: ReactNode | ((params: ReturnType<typeof useModal>) => ReactNode);
};

export function PageWithSearch({ children }: Props) {
  const history = useHistory();
  const modalProps = useModal();
  const { isOpen, open, dismiss } = modalProps;

  log("PageWithSearch", { isOpen });

  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  return (
    <IonPage>
      <HeaderSearchComponent onClickSearchButton={open} />
      <IonContent fullscreen>
        {/* Search Modal */}
        <IonModal
          isOpen={isOpen}
          onIonModalDidDismiss={dismiss}
          onIonModalDidPresent={() => searchBarRef.current?.setFocus()}
        >
          <SearchProvider>
            {({ suggestions, query, onChangeListener }) => (
              <>
                <IonHeader>
                  <IonToolbar>
                    <SearchBar
                      autoFocus
                      value={query}
                      ref={searchBarRef}
                      onClickCancel={dismiss}
                      onChangeSearch={onChangeListener}
                    />
                  </IonToolbar>
                </IonHeader>
                {suggestions && suggestions.length > 0 && (
                  <IonList lines="full" className="flex-grow overflow-y-auto">
                    {suggestions.map((suggestion) => {
                      const {
                        title,
                        recipeId,
                        nutrients,
                        servings = 1,
                      } = suggestion;
                      const { calories } = useNutrients(nutrients);

                      return (
                        <IonItem
                          button
                          key={recipeId}
                          onClick={() => {
                            history.push(routes.getRecipe(suggestion));
                            dismiss();
                          }}
                        >
                          <IonLabel>
                            <h2>{title}</h2>
                            {calories && (
                              <IonNote className="text-secondary">
                                {Math.round(calories.amount)} kcal / {servings}{" "}
                                serving{servings > 1 && "s"}
                              </IonNote>
                            )}
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                  </IonList>
                )}
              </>
            )}
          </SearchProvider>
        </IonModal>
        {typeof children !== "function" ? children : children(modalProps)}
      </IonContent>
    </IonPage>
  );
}
