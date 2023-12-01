import { forwardRef } from "react";
import { IonSearchbar } from "@ionic/react";

type Props = {
  value?: string;
  autoFocus?: boolean;
  onClickCancel?: () => void;
  onChangeSearch?: (e: CustomEvent) => void;
};

export const SearchBar = forwardRef<HTMLIonSearchbarElement, Props>(
  ({ value, autoFocus = false, onClickCancel, onChangeSearch }, ref) => {
    return (
      <IonSearchbar
        ref={ref}
        value={value}
        autoFocus={autoFocus}
        showClearButton="always"
        showCancelButton="always"
        onIonInput={onChangeSearch}
        onIonCancel={onClickCancel}
        placeholder="Search grape things 🍇"
      />
    );
  }
);
