import { useRef } from "react";

export function useModal() {
  const ref = useRef<HTMLIonModalElement>(null);

  return {
    ref,
    dismiss: () => ref.current?.dismiss(),
  };
}
