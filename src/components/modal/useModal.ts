import { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export function useModal() {
  return useContext(ModalContext);
}
