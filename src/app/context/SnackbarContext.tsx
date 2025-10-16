"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type SnackbarMessage = {
  message: string;
  severity: AlertColor;
  key: number;
};

type SnackbarContextType = {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return ctx;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const showMessage = useCallback(
    (message: string, severity: AlertColor) => {
      setSnackPack((prev) => [
        ...prev,
        { message, severity, key: new Date().getTime() },
      ]);
    },
    []
  );

  const info = useCallback(
    (message: string) => showMessage(message, "info"),
    [showMessage]
  );

  const success = useCallback(
    (message: string) => showMessage(message, "success"),
    [showMessage]
  );

  const warning = useCallback(
    (message: string) => showMessage(message, "warning"),
    [showMessage]
  );

  const error = useCallback(
    (message: string) => showMessage(message, "error"),
    [showMessage]
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <SnackbarContext.Provider value={{ info, success, warning, error }}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageInfo?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
