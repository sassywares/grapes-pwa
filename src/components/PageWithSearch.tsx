import { ModalProvider } from "./modal";
import { ReactNode, useRef } from "react";

// Components
import { IonPage } from "@ionic/react";
import { PageContent } from "./PageContent";
import { RecipeSearchModal } from "@/recipe/components";
import { HeaderSearchComponent } from "./header/variants";

type Props = {
  children: ReactNode;
};

export function PageWithSearch({ children }: Props) {
  const pageRef = useRef();

  return (
    <IonPage ref={pageRef}>
      <ModalProvider>
        <HeaderSearchComponent />
        <PageContent>
          {/* Search Modal */}
          <RecipeSearchModal presentingElement={pageRef.current} />
          {children}
        </PageContent>
      </ModalProvider>
    </IonPage>
  );
}
