import { useModal } from "./modal";
import { ReactNode, useRef } from "react";

// Components
import { SearchBar } from "./search";
import { HeaderSearchComponent } from "./header/variants";
import {
  IonPage,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
} from "@ionic/react";

type Props = {
  children: ReactNode | ((params: ReturnType<typeof useModal>) => ReactNode);
};

export function PageWithSearch({ children }: Props) {
  const modalProps = useModal();
  const { isOpen, open, dismiss } = modalProps;
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  return (
    <IonPage>
      <HeaderSearchComponent onClickSearchButton={open} />
      <IonContent fullscreen>
        {/* Search Modal */}
        <IonModal
          isOpen={isOpen}
          onIonModalDidPresent={() => searchBarRef.current?.setFocus()}
        >
          <IonHeader>
            <IonToolbar>
              <SearchBar autoFocus onClickCancel={dismiss} ref={searchBarRef} />
            </IonToolbar>
          </IonHeader>
        </IonModal>
        {typeof children !== "function" ? children : children(modalProps)}
      </IonContent>
    </IonPage>
  );
}
