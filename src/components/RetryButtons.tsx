import { APP_EMAIL } from "@/config";
import { IonButton } from "@ionic/react";

export function RetryButtons({ message }: { message: string }) {
  const subject = encodeURIComponent("Error in Grape");
  const body = encodeURIComponent(message);

  return (
    <>
      <IonButton color="danger" onClick={() => window.location.reload()}>
        Retry
      </IonButton>
      <IonButton
        fill="outline"
        color="danger"
        target="_blank"
        rel="noreferrer"
        href={`mailto:${APP_EMAIL}?subject=${subject}&body=${body}`}
      >
        Report
      </IonButton>
    </>
  );
}
