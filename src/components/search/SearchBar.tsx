import { forwardRef } from "react";
import { IonSearchbar } from "@ionic/react";

type Props = {
  autoFocus?: boolean;
  onClickCancel?: () => void;
};

export const SearchBar = forwardRef<HTMLIonSearchbarElement, Props>(
  ({ autoFocus = false, onClickCancel }, ref) => {
    return (
      <IonSearchbar
        ref={ref}
        debounce={1000}
        autoFocus={autoFocus}
        showClearButton="always"
        showCancelButton="always"
        onIonCancel={onClickCancel}
        placeholder="Search grape things here 🍇"
      />
    );
  }
);
