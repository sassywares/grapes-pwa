import "./SearchPage.css";
import { useHistory } from "react-router";
import { SearchBar } from "@/components/search";

// Components
import { IonPage, IonContent } from "@ionic/react";
import { ExploreContainer } from "@/components/ExploreContainer";
import { HeaderSearchComponent } from "@/components/header/variants/HeaderSearchComponent";

export const SearchPage: React.FC = () => {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <IonPage>
      <HeaderSearchComponent onClickSearchButton={goBack}>
        <SearchBar autoFocus onClickCancel={goBack} />
      </HeaderSearchComponent>
      <IonContent fullscreen>
        <ExploreContainer name="Search Page" />
      </IonContent>
    </IonPage>
  );
};
