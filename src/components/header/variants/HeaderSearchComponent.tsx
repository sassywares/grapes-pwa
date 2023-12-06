import { useMediaQuery } from "@/hooks";
import { search } from "ionicons/icons";

// Components
import { useModal } from "@/components/modal";
import { HeaderComponent } from "../HeaderComponent";
import { IonIcon, IonButton, IonButtons, IonMenuButton } from "@ionic/react";

export function HeaderSearchComponent() {
  const { open } = useModal();
  const isWithinLg = useMediaQuery("(max-width: 992px)");

  return (
    <HeaderComponent
      leftSlot={
        isWithinLg && (
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        )
      }
      rightSlot={
        <IonButtons slot="end">
          <IonButton onClick={open}>
            <IonIcon title="Open Search Modal" icon={search} />
          </IonButton>
        </IonButtons>
      }
    />
  );
}
