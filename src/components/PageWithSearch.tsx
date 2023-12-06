import { isIos } from "@/utils";
import { ModalProvider } from "./modal";
import { ReactNode, useRef } from "react";
import {
  starOutline,
  starSharp,
  informationCircleOutline,
  informationCircleSharp,
  bulbOutline,
  bulbSharp,
  bugSharp,
  bugOutline,
  mapSharp,
  mapOutline,
  helpCircleSharp,
  helpCircleOutline,
} from "ionicons/icons";

// Components
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { APP_EMAIL, APP_NAME, ROADMAP_URL } from "@/config";
import { useMediaQuery } from "@/hooks";
import { PageContent } from "./PageContent";
import { ThemeSelect } from "./ThemeSelect";
import { RecipeSearchModal } from "@/recipe/components";
import { HeaderSearchComponent } from "./header/variants";

type Props = {
  children: ReactNode;
};

export const menuItems = [
  {
    mdIcon: informationCircleSharp,
    iosIcon: informationCircleOutline,
    label: "About us",
    href: "",
  },
  {
    mdIcon: starSharp,
    iosIcon: starOutline,
    label: "Rate the app",
    href: "",
  },
  {
    mdIcon: bulbSharp,
    iosIcon: bulbOutline,
    label: "Feature Request",
    href: `mailto:${APP_EMAIL}?subject=Feature%20Request&body=Please%20describe%20the%20feature%20below%3A%0A%0A%0A%0A%0A%0A%0A%0A%0A`,
  },
  {
    mdIcon: bugSharp,
    iosIcon: bugOutline,
    label: "Report a bug",
    href: `mailto:${APP_EMAIL}?subject=Bug%20Report&body=Please%20describe%20the%20bug%20below%3A%0A%0A%0A%0A%0A%0A%0A%0A%0A`,
  },
  {
    mdIcon: mapSharp,
    iosIcon: mapOutline,
    label: "Roadmap",
    href: ROADMAP_URL,
  },
  {
    mdIcon: helpCircleSharp,
    iosIcon: helpCircleOutline,
    label: "Help",
    href: `mailto:${APP_EMAIL}?subject=Help%20Request&body=Please%20describe%20the%20help%20you%20need%20below%3A%0A%0A%0A%0A%0A%0A%0A%0A%0A`,
  },
];

export function PageWithSearch({ children }: Props) {
  const pageRef = useRef();
  const isWithinLg = useMediaQuery("(max-width: 992px)");

  return (
    <>
      {isWithinLg && (
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>{APP_NAME}</IonTitle>
              <IonButtons slot="start">
                <ThemeSelect />
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList lines="full">
              {menuItems.map(({ label, mdIcon, iosIcon, href }, i) => (
                <IonItem
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  lines={i === menuItems.length - 1 ? "none" : "full"}
                >
                  <IonIcon
                    slot="start"
                    size="small"
                    icon={isIos ? iosIcon : mdIcon}
                  />
                  <IonLabel>{label}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonMenu>
      )}
      <IonPage ref={pageRef} id="main-content">
        <ModalProvider>
          <HeaderSearchComponent />
          <PageContent>
            {/* Search Modal */}
            <RecipeSearchModal presentingElement={pageRef.current} />
            {children}
          </PageContent>
        </ModalProvider>
      </IonPage>
    </>
  );
}
