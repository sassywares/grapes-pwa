import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    dismiss: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  };
}
