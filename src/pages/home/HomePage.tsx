import "./HomePage.css";
import { useRef } from "react";
import { useModal } from "@/components/modal";

// Components
import { SearchBar } from "@/components/search";
import { ExploreContainer } from "@/components/ExploreContainer";
import { HeaderSearchComponent } from "@/components/header/variants/HeaderSearchComponent";
import {
  IonPage,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

export const HomePage: React.FC = () => {
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
        <ExploreContainer name="Tab 1 page" />
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
      </IonContent>
    </IonPage>
  );
};
