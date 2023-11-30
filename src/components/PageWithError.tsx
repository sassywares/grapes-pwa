import { routes } from "@/config";

// Components
import { HeaderErrorComponent } from "./header/variants";
import { IonPage, IonContent, IonButton } from "@ionic/react";

export function PageWithError({ error }: { error: Error }) {
  return (
    <IonPage>
      <HeaderErrorComponent />
      <IonContent fullscreen>
        <div className="p-content flex flex-col justify-center items-center gap-content">
          <p role="alert" className="text-center">
            {error.message}
          </p>
          <div className="flex items-center justify-center gap-content">
            <IonButton color="tertiary" routerLink={routes.home}>
              Go Home
            </IonButton>
            <IonButton
              color="tertiary"
              fill="outline"
              onClick={() => window.location.reload()}
            >
              Retry
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
