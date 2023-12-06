import { Theme } from "@/types";
import { useRef, useState } from "react";
import { getTheme, setTheme } from "@/utils";
import { IonButton, IonSelect, IonSelectOption } from "@ionic/react";

export function ThemeSelect() {
  const [theme, setThemeState] = useState(getTheme());
  const selectRef = useRef<HTMLIonSelectElement>(null);

  function updateTheme(theme: Theme) {
    setTheme(theme);
    setThemeState(theme);
  }

  return (
    <>
      <IonButton
        aria-hidden="true"
        aria-controls="themeSelectComponent"
        onClick={() => selectRef.current?.open()}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </IonButton>
      <IonSelect
        label="Theme"
        value={theme}
        ref={selectRef}
        id="themeSelectComponent"
        className="select-theme text-primary"
        onIonChange={(e) => updateTheme(e.detail.value)}
      >
        <IonSelectOption value="dark">Dark</IonSelectOption>
        <IonSelectOption value="light">Light</IonSelectOption>
        <IonSelectOption value="system">System</IonSelectOption>
      </IonSelect>
    </>
  );
}
