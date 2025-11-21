import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./SnackbarContext";
import { DialogProvider } from "./DialogContext";
import AuthProvider from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Project Context
type ProjectContextType = {
  selectedProject: any | null;
  setSelectedProject: (project: any | null) => void;
};


export default function AllContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Rendering AllContextProviders");

  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <SnackbarProvider>
            <DialogProvider>{children}</DialogProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
