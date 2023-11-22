import { IonTitle, IonHeader, IonToolbar } from "@ionic/react";
import { PropsWithChildren } from "react";
import { APP_NAME } from "@/config";

type Props = PropsWithChildren<{
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}>;

export function HeaderComponent({ children, leftSlot, rightSlot }: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        {leftSlot}
        <IonTitle>{APP_NAME}</IonTitle>
        {rightSlot}
      </IonToolbar>
      {children}
    </IonHeader>
  );
}
