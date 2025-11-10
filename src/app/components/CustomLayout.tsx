"use client";
import React from "react";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import AllContextProviders from "../context/all";
import AppHeader from "./navigation/AppHeader";
import NavigationDrawer from "./navigation/NavigationDrawer";
import { DRAWER_WIDTH } from "./navigation/constants";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMerchantDetails } from "../queries/useMerchantDetails";
import UnauthorizedPage from "./UnauthorizedPage";

// Inner component that uses useSession (must be inside SessionProvider)
function LayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { data, error, isLoading } = useMerchantDetails();
  const isSignInPage = pathname === "/signin";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Show loading state
  if (status === "loading" || isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Box sx={{ textAlign: "center", color: "white" }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 300 }}>
            {data?.merchantDetails?.businessName || "Loading..."}
          </Typography>
          <Box
            sx={{
              width: 40,
              height: 40,
              margin: "0 auto",
              border: "3px solid rgba(255,255,255,0.3)",
              borderTop: "3px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>
      </Box>
    );
  }

  // If on sign-in page or not authenticated, show children without layout
  if (isSignInPage || !session) {
    return <>{children}</>;
  }

  // Show unauthorized page if merchantDetails fetch failed
  if (error) {
    return <UnauthorizedPage />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* Top App Bar */}
      <AppHeader onMenuClick={handleDrawerToggle} />

      {/* Side Drawer */}
      <NavigationDrawer
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

// Main layout component that provides all contexts
export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AllContextProviders>
      <LayoutContent>{children}</LayoutContent>
    </AllContextProviders>
  );
}
