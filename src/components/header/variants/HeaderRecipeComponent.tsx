import { useState } from "react";
import { routes } from "@/config";
import { heart } from "ionicons/icons";

// Components
import { Recipe } from "@/recipe";
import { HeaderComponent } from "../HeaderComponent";
import { IonIcon, IonButton, IonButtons, IonBackButton } from "@ionic/react";

type Props = Pick<Recipe, "recipeId" | "title">;

export function HeaderRecipeComponent({ title, recipeId }: Props) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const onClickLikeListener = () => {
    setIsLiked(true);
  };

  const onClickDislikeListener = () => {
    setIsLiked(false);
  };

  return (
    <HeaderComponent
      title=""
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
