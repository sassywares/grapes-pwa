import { log } from "@/utils";
import { useState } from "react";
import { routes } from "@/config";
import { heart } from "ionicons/icons";
import {
  Recipe,
  isRecipeLiked,
  cacheRecipeLike,
  cacheRecipeDislike,
} from "@/recipe";

// Components
import { HeaderComponent } from "../HeaderComponent";
import { IonIcon, IonButton, IonButtons, IonBackButton } from "@ionic/react";

export function HeaderRecipeComponent(recipe: Recipe) {
  const { recipeId } = recipe;

  // We don't have an auth system right now, so a recipe's like is stored in cache.
  const [isLiked, setIsLiked] = useState<boolean>(isRecipeLiked(recipeId));

  log("HeaderRecipeComponent", { recipe, isLiked });

  const onClickLikeListener = () => {
    setIsLiked(true);
    cacheRecipeLike(recipe);
  };

  const onClickDislikeListener = () => {
    setIsLiked(false);
    cacheRecipeDislike(recipe);
  };

  return (
    <HeaderComponent
      title="Recipe"
      leftSlot={
        <IonButtons slot="start">
          <IonBackButton defaultHref={routes.home} />
        </IonButtons>
      }
      rightSlot={
        <IonButtons slot="end">
          {isLiked ? (
            <IonButton onClick={onClickDislikeListener}>
              <IonIcon title="Dislike Recipe" icon={heart} color="danger" />
            </IonButton>
          ) : (
            <IonButton onClick={onClickLikeListener}>
              <IonIcon title="Like Recipe" icon={heart} />
            </IonButton>
          )}
        </IonButtons>
      }
    />
  );
}
