import { createContext, useState } from "react";

export type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  dismiss: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        dismiss: () => setIsOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
