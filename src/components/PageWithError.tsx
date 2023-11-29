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
          <div role="alert" className="text-center">
            {error.message}
          </div>
          <div className="flex items-center justify-center gap-content">
            <IonButton routerLink={routes.home}>Go Home</IonButton>
            <IonButton onClick={() => window.location.reload()}>
              Retry
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
