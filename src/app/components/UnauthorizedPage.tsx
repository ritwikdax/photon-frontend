"use client";
import React from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import BlockIcon from "@mui/icons-material/Block";
import { signOut } from "next-auth/react";
import { keyframes } from "@mui/system";

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

export default function UnauthorizedPage() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        padding: 2,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          animation: `${pulse} 4s ease-in-out infinite`,
        },
      }}
    >
      {/* Floating background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: "1s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "5%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          animation: `${float} 7s ease-in-out infinite`,
          animationDelay: "2s",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            padding: { xs: 4, sm: 6 },
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            animation: `${fadeIn} 0.6s ease-out`,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "200%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: `${shimmer} 3s infinite`,
            },
          }}
        >
          {/* Animated Icon Container */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
              position: "relative",
            }}
          > 
            {/* Main icon container */}
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 40px rgba(245, 87, 108, 0.4)",
                animation: `${float} 3s ease-in-out infinite`,
                position: "relative",
                zIndex: 1,
              }}
            >
              <LockIcon sx={{ fontSize: 56, color: "white" }} />
            </Box>

            {/* Small floating icons */}
            <SecurityIcon
              sx={{
                position: "absolute",
                top: 0,
                right: "25%",
                fontSize: 28,
                color: "error.main",
                opacity: 0.6,
                animation: `${float} 4s ease-in-out infinite`,
                animationDelay: "0.5s",
              }}
            />
            <BlockIcon
              sx={{
                position: "absolute",
                bottom: 0,
                left: "25%",
                fontSize: 28,
                color: "error.main",
                opacity: 0.6,
                animation: `${float} 4s ease-in-out infinite`,
                animationDelay: "1s",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2rem", sm: "3rem" },
            }}
          >
            Access Denied
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 1,
              fontSize: "1.1rem",
            }}
          >
            You do not have permission to access this application.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 4,
              fontStyle: "italic",
            }}
          >
            Please write us an email to request access for FREE Trial.
          </Typography>

          {/* Divider line */}
          <Box
            sx={{
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              margin: "0 auto",
              mb: 4,
              borderRadius: 2,
            }}
          />

          {/* Sign Out Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSignOut}
            sx={{
              textTransform: "none",
              paddingX: 5,
              paddingY: 1.8,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #653a8b 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Sign Out
          </Button>

          {/* Additional help text */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 3,
              color: "text.disabled",
              fontSize: "0.85rem",
            }}
          >
            Need help? Contact support@yourdomain.com
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
