import { heart } from "ionicons/icons";

// Components
import {
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { Recipe } from "../recipeTypes";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { RecipeImage } from "./RecipeImage";

export function RecipeCard(recipe: Recipe) {
  const { image, title, recipeId, readyInMinutes, aggregateLikes } = recipe;

  return (
    <IonCard className="ion-activatable recipe">
      <Link
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        to={{
          state: recipe,
          pathname: routes.getRecipe(recipeId),
        }}
      />
      <RecipeImage src={image} alt={title} />
      <IonCardHeader>
        <div className="flex items-center justify-between">
          <IonCardSubtitle>{readyInMinutes} min</IonCardSubtitle>
          <IonBadge aria-label="Likes" color="tertiary">
            <IonIcon icon={heart} />
            {aggregateLikes}
          </IonBadge>
        </div>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}
