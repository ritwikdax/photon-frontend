"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogProps } from "@mui/material";

interface DialogContextType {
  openDialog: (content: ReactNode, options?: Partial<DialogProps>) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const [dialogOptions, setDialogOptions] = useState<Partial<DialogProps>>({});

  const openDialog = (content: ReactNode, options?: Partial<DialogProps>) => {
    setDialogContent(content);
    setDialogOptions(options || {});
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    // Clear content after animation completes
    setTimeout(() => {
      setDialogContent(null);
      setDialogOptions({});
    }, 200);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        maxWidth="md"
        fullWidth
        {...dialogOptions}
      >
        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};
