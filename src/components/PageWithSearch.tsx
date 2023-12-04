import { ReactNode } from "react";
import { ModalProvider } from "./modal";

// Components
import { IonPage } from "@ionic/react";
import { SearchModal } from "./search";
import { PageContent } from "./PageContent";
import { HeaderSearchComponent } from "./header/variants";

type Props = {
  children: ReactNode;
};

export function PageWithSearch({ children }: Props) {
  return (
    <IonPage>
      <ModalProvider>
        <HeaderSearchComponent />
        <PageContent>
          {/* Search Modal */}
          <SearchModal />
          {children}
        </PageContent>
      </ModalProvider>
    </IonPage>
  );
}
