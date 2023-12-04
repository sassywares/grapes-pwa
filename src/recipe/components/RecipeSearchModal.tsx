import { useRef } from "react";
import { useModal } from "@/components/modal";

// Components
import { SearchBar } from "@/components";
import { RecipeSearchProvider } from "./RecipeSearchProvider";
import { IonModal, IonHeader, IonToolbar } from "@ionic/react";
import { RecipeSearchModalRenderer } from "./RecipeSearchModalRenderer";

export function RecipeSearchModal({
  presentingElement,
}: {
  presentingElement?: HTMLElement;
}) {
  const { isOpen, dismiss } = useModal();
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);

  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={presentingElement}
      onIonModalWillDismiss={() => dismiss()}
      onIonModalDidPresent={() => searchBarRef.current?.setFocus()}
    >
      <RecipeSearchProvider>
        {({ query, onChangeListener, ...props }) => (
          <>
            <IonHeader>
              <IonToolbar>
                <SearchBar
                  autoFocus
                  value={query}
                  ref={searchBarRef}
                  onClickCancel={dismiss}
                  onChangeSearch={onChangeListener}
                />
              </IonToolbar>
            </IonHeader>
            <RecipeSearchModalRenderer {...props} onDismiss={dismiss} />
          </>
        )}
      </RecipeSearchProvider>
    </IonModal>
  );
}
