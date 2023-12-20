import { routes } from "@/config";
import { IonBackButton } from "@ionic/react";

export const BackButton = () => <IonBackButton defaultHref={routes.home} />;
