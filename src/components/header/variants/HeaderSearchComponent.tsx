import { search } from "ionicons/icons";

// Components
import { useModal } from "@/components/modal";
import { HeaderComponent } from "../HeaderComponent";
import { IonIcon, IonButton, IonButtons } from "@ionic/react";

export function HeaderSearchComponent() {
  const { open } = useModal();

  return (
    <HeaderComponent
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
