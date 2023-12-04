import { useRef } from "react";
import { routes } from "@/config";
import { useModal } from "../modal";
import { useHistory } from "react-router";
import { useNutrients } from "@/recipe/hooks";

// Components
import { SearchBar } from "./SearchBar";
import { SearchProvider } from "./SearchProvider";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";

export function SearchModal() {
  const history = useHistory();
  const { isOpen, dismiss } = useModal();
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  return (
    <IonModal
      isOpen={isOpen}
      onIonModalWillDismiss={() => dismiss()}
      onIonModalDidPresent={() => searchBarRef.current?.setFocus()}
    >
      <SearchProvider>
        {({ isLoading, error, suggestions, query, onChangeListener }) => (
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
            {isLoading && (
              <IonList lines="none">
                <IonItem>
                  <IonLabel>
                    <h2>Loading...</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
            )}
            {error && error.search && (
              <IonList lines="none">
                <IonItem>
                  <IonLabel>
                    <h2>{error.search}</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
            )}
            {!!suggestions && suggestions.length > 0 && (
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
                        history.push(
                          routes.getRecipe(suggestion, `search=${query}`)
                        );
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
  );
}
