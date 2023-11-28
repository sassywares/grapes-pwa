import { APP_NAME } from "@/config";
import { PropsWithChildren, ReactNode } from "react";
import { IonTitle, IonHeader, IonToolbar } from "@ionic/react";

type Props = PropsWithChildren<{
  title?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}>;

export function HeaderComponent({
  children,
  leftSlot,
  rightSlot,
  title = APP_NAME,
}: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        {leftSlot}
        <IonTitle>{title}</IonTitle>
        {rightSlot}
      </IonToolbar>
      {children}
    </IonHeader>
  );
}
