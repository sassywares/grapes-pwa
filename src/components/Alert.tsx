import { isIos } from "@/utils";
import { IonIcon } from "@ionic/react";
import {
  informationCircleSharp,
  informationCircleOutline,
} from "ionicons/icons";

export function Alert({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className="flex items-center flex-col md:flex-row p-content gap-content text-danger rounded-lg border border-danger dark:bg-dark-shade/30 bg-light-shade/30"
    >
      <div className="flex flex-grow items-center gap-2">
        {isIos ? (
          <IonIcon
            className="w-6 h-6 flex-shrink-0"
            icon={informationCircleOutline}
          />
        ) : (
          <IonIcon
            className="w-6 h-6 flex-shrink-0"
            icon={informationCircleSharp}
          />
        )}
        <span className="sr-only">Info</span>
        <p className="flex-grow">{title}</p>
      </div>
      <div className="flex gap-content items-center">{children}</div>
    </div>
  );
}
