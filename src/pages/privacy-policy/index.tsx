import { BackButton, PageContent } from "@/components";
import { HeaderComponent } from "@/components/header";
import { IonButtons, IonPage } from "@ionic/react";
import { PrivacyPolicy } from "./PrivacyPolicy";

export function PrivacyPolicyPage() {
  return (
    <IonPage>
      <HeaderComponent
        title="Privacy Policy"
        leftSlot={
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>
        }
      />
      <PageContent>
        <div className="prose prose-purple dark:prose-invert mx-auto p-content">
          <PrivacyPolicy />
        </div>
      </PageContent>
    </IonPage>
  );
}
