// Components
import { HeaderComponent } from "../HeaderComponent";
import { IonButton, IonButtons, IonSkeletonText } from "@ionic/react";

export function HeaderLoadingComponent() {
  return (
    <HeaderComponent
      title={<IonSkeletonText animated style={{ width: "10rem" }} />}
      rightSlot={
        <IonButtons slot="end">
          <IonButton>
            <IonSkeletonText animated style={{ width: "1rem" }} />
          </IonButton>
        </IonButtons>
      }
    />
  );
}
