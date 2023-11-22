import { search } from "ionicons/icons";

// Components
import { HeaderComponent } from "../HeaderComponent";
import { IonIcon, IonButton, IonButtons } from "@ionic/react";

type Props = {
  searchButtonId?: string;
  onClickSearchButton?: () => void;
};

export function HeaderSearchComponent({
  searchButtonId,
  onClickSearchButton,
}: Props) {
  return (
    <HeaderComponent
      rightSlot={
        <IonButtons slot="end">
          <IonButton id={searchButtonId} onClick={onClickSearchButton}>
            <IonIcon title="Open Search Modal" icon={search} />
          </IonButton>
        </IonButtons>
      }
    />
  );
}
