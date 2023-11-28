import { Recipe } from "../recipeTypes";

// Components
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonContent,
} from "@ionic/react";
import { RecipeImage } from "./RecipeImage";

export function RecipeDetailComponent(recipe: Recipe) {
  const {
    author,
    healthScore,
    image,
    readyInMinutes,
    servings,
    summary,
    title,
  } = recipe;

  return (
    <IonContent className="recipe">
      <RecipeImage src={image} alt={title} />

      <IonCardHeader>
        <IonCardSubtitle>{readyInMinutes} min</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {summary && (
          <p
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          />
        )}

        {/* Add more details as needed */}
        <p>Author: {author}</p>
        <p>Servings: {servings}</p>
        <p>Health Score: {healthScore}</p>

        {/* You can continue to display more recipe details */}
      </IonCardContent>
    </IonContent>
  );
}
