import { APP_EMAIL, APP_NAME, routes } from "@/config";

// Components
import { HeaderComponent } from "../HeaderComponent";
import { IonButton, IonButtons, IonBackButton } from "@ionic/react";

export function HeaderErrorComponent() {
  const subject = `Error in ${APP_NAME}`;
  const body = `I found an error in ${APP_NAME}!`;

  return (
    <HeaderComponent
      title="Yikes! 🍇"
      leftSlot={
        <IonButtons slot="start">
          <IonBackButton defaultHref={routes.home} />
        </IonButtons>
      }
      rightSlot={
        <IonButtons slot="end">
          <IonButton
            href={`mailto://${APP_EMAIL}?subject=${subject}&body=${body}`}
          >
            Report
          </IonButton>
        </IonButtons>
      }
    />
  );
}
