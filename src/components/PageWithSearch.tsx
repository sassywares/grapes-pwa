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

export function PageWithSearch({ children }: { children: ReactNode }) {
  const { ref, dismiss } = useModal();
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  /**
   * This is the ID of the search button in the header.
   */
  const controlId = "searchBarControl";

  return (
    <IonPage>
      <HeaderSearchComponent searchButtonId={controlId} />
      <IonContent fullscreen>
        {/* Search Modal */}
        <IonModal
          ref={ref}
          trigger={controlId}
          onIonModalDidPresent={() => searchBarRef.current?.setFocus()}
        >
          <IonHeader>
            <IonToolbar>
              <SearchBar autoFocus onClickCancel={dismiss} ref={searchBarRef} />
            </IonToolbar>
          </IonHeader>
        </IonModal>
        {children}
      </IonContent>
    </IonPage>
  );
}
