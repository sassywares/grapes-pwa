import { IonContent } from "@ionic/react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export function PageContent({ children, ...props }: Props) {
  return (
    <IonContent {...props} fullscreen>
      {children}
      <footer className="hidden desktop:block container p-content">
        {" "}
        Hello World
      </footer>
    </IonContent>
  );
}
