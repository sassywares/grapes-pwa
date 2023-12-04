import { routes } from "@/config";

// Components
import { ResponseErrors } from "@/types";
import { PageContent } from "./PageContent";
import { IonPage, IonButton } from "@ionic/react";
import { HeaderErrorComponent } from "./header/variants";

export function PageWithError({ error }: { error: ResponseErrors }) {
  return (
    <IonPage>
      <HeaderErrorComponent />
      <PageContent>
        <div className="p-content flex flex-col justify-center items-center gap-content">
          <p role="alert" className="text-center">
            {error?.message}
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
      </PageContent>
    </IonPage>
  );
}
