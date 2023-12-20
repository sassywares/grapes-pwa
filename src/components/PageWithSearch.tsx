import { isDesktop, isIos } from "@/utils";
import { ModalProvider } from "./modal";
import { ReactNode, useRef } from "react";
import {
  helpCircleOutline,
  helpCircleSharp,
  informationCircleOutline,
  informationCircleSharp,
  mailOutline,
  mailSharp,
  mapOutline,
  mapSharp,
  shieldOutline,
  shieldSharp,
  starOutline,
  starSharp,
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
import {
  ABOUT_URL,
  APP_EMAIL,
  APP_NAME,
  APP_WEBSITE,
  ROADMAP_URL,
} from "@/config";
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
    href: ABOUT_URL,
  },
  {
    mdIcon: starSharp,
    iosIcon: starOutline,
    label: "Rate the app",
    href: "",
    className: "hidden",
  },
  {
    mdIcon: mailSharp,
    iosIcon: mailOutline,
    label: "Contact us",
    href: `mailto:${APP_EMAIL}`,
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
  {
    mdIcon: shieldSharp,
    iosIcon: shieldOutline,
    label: "Privacy Policy",
    href: `${APP_WEBSITE}/privacy-policy`,
  },
];

export function PageWithSearch({ children }: Props) {
  const pageRef = useRef();
  const isWithinLg = useMediaQuery("(max-width: 992px)");

  return (
    <>
      {/* Show left drawer only when above the lg breakpoint */}
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
              {menuItems.map(({ label, mdIcon, iosIcon, ...props }, i) => (
                <IonItem
                  {...props}
                  key={label}
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
