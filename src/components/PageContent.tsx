import { PropsWithChildren } from "react";
import { IonContent } from "@ionic/react";
import { Footer } from "./Footer";

type Props = PropsWithChildren<{ className?: string }>;

export function PageContent({ children, ...props }: Props) {
  return (
    <IonContent {...props} fullscreen>
      {children}
      <Footer />
    </IonContent>
  );
}
