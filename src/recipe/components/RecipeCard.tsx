import { heart } from "ionicons/icons";
import { useEffect, useState } from "react";

// Components
import {
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";
import { Recipe } from "../recipeTypes";
import { Link } from "react-router-dom";
import { routes } from "@/config";

export function RecipeCard(recipe: Recipe) {
  const { image, title, recipeId, readyInMinutes, aggregateLikes } = recipe;

  // State: Loading state
  // If there is an image, set the loading state to true
  const [isLoading, setIsLoading] = useState(!image);

  /**
   * Effect: Lazy load image
   */
  useEffect(() => {
    if (!image) return;

    // Create a new image and set the source to the image url
    const img = new Image();
    img.src = image;

    // When the image is loaded, set the loading state to false
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <IonCard className="ion-activatable">
      <Link
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        to={{
          state: recipe,
          pathname: routes.getRecipe(recipeId),
        }}
      />
      {isLoading ? (
        <IonThumbnail>
          <IonSkeletonText animated />
        </IonThumbnail>
      ) : (
        <img alt={title} src={image} />
      )}
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
