import { routes } from "@/config";
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
import { RecipeImage } from "./RecipeImage";

export function RecipeCard(recipe: Recipe) {
  const { image, title, readyInMinutes, aggregateLikes } = recipe;

  return (
    <IonCard className="ion-activatable recipe group hover:scale-95">
      <Link
        title={title}
        to={routes.getRecipe(recipe)}
        className="absolute top-0 left-0 w-full h-full"
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
