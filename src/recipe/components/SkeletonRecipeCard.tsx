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
      <div className="recipe-image">
        <IonThumbnail aria-hidden="true">
          <IonSkeletonText animated />
        </IonThumbnail>
      </div>
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
          <IonSkeletonText animated style={{ width: "60%" }} />
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}
