import {
  IonCard,
  IonThumbnail,
  IonSkeletonText,
  IonCardHeader,
  IonCardSubtitle,
  IonBadge,
  IonCardTitle,
} from "@ionic/react";

export function SkeletonRecipeCard() {
  return (
    <IonCard aria-label="Loading" className="recipe">
      <IonThumbnail aria-hidden="true">
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonCardHeader aria-hidden="true">
        <div className="flex items-center justify-between">
          <IonCardSubtitle>
            <IonSkeletonText animated style={{ width: "40px" }} />
          </IonCardSubtitle>
          <IonBadge aria-label="Likes" color="tertiary">
            <IonSkeletonText animated style={{ width: "20px" }} />
          </IonBadge>
        </div>
        <IonCardTitle>
          <IonSkeletonText animated style={{ width: "80%" }} />
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}
