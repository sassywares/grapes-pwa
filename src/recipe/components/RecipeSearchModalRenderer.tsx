import { routes } from "@/config";
import { useNutrients } from "../hooks";
import { useHistory } from "react-router";
import { SearchProviderReturns } from "./RecipeSearchProvider";
import { IonList, IonItem, IonLabel, IonNote } from "@ionic/react";

export type RecipeSearchModalRendererProps = Pick<
  SearchProviderReturns,
  "error" | "isLoading" | "suggestions"
> & {
  onDismiss: () => void;
};

export function RecipeSearchModalRenderer({
  error,
  isLoading,
  suggestions,
  onDismiss,
}: RecipeSearchModalRendererProps) {
  const history = useHistory();

  return (
    <>
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
            const { title, recipeId, nutrients, servings = 1 } = suggestion;
            const { calories } = useNutrients(nutrients);

            return (
              <IonItem
                button
                role="link"
                key={recipeId}
                onClick={() => {
                  history.push(routes.getRecipe(suggestion));
                  onDismiss();
                }}
              >
                <IonLabel>
                  <h2>{title}</h2>
                  {calories && (
                    <IonNote className="text-secondary">
                      {Math.round(calories.amount)} kcal / {servings} serving
                      {servings > 1 && "s"}
                    </IonNote>
                  )}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      )}
    </>
  );
}
