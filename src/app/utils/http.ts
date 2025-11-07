import axios from "axios";
import { getSession } from "next-auth/react";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.10:3001",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
  },
});

// Add request interceptor to attach auth token to every request
http.interceptors.request.use(
  async (config) => {
    // Get the current session
    const session = await getSession();
    
    // Prefer ID token for user authentication (it's a JWT that can be verified)
    // Use access token only if you need to call Google APIs
    if (session?.idToken) {
      // Send the Google ID token (JWT format - can be verified by backend)
      config.headers.Authorization = `Bearer ${session.idToken}`;
      console.log("✅ Added idToken (JWT) to Authorization header");
    } else if (session?.accessToken) {
      // Send the Google access token (opaque token for Google API calls)
      config.headers.Authorization = `Bearer ${session.accessToken}`;
      console.log("✅ Added accessToken to Authorization header");
    } else if (session?.user?.email) {
      // Fallback: send user email if no token available
      config.headers["X-User-Email"] = session.user.email;
      console.log("✅ Added email to X-User-Email header");
    } else {
      console.warn("⚠️ No token or user info available in session");
    }
    
    // Ensure no caching for authenticated requests
    if (config.headers.Authorization) {
      config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      config.headers["Pragma"] = "no-cache";
      config.headers["Expires"] = "0";
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
http.interceptors.response.use(
  (response) => {
    // Log response status for debugging
    console.log(`📥 Response: ${response.config.url} - Status: ${response.status}`);
    
    // Log if it's a cached response
    if (response.status === 304) {
      console.log("📦 304 Not Modified - Using cached response");
      console.log("🔐 Request had Authorization header:", !!response.config.headers?.Authorization);
    }
    
    return response;
  },
  async (error) => {
    // If we get a 401, the token might be expired
    if (error.response?.status === 401) {
      // You can redirect to sign-in or refresh token here
      console.error("❌ 401 Unauthorized - session may have expired");
      console.error("🔐 Request had Authorization header:", !!error.config?.headers?.Authorization);
      
      // Optionally redirect to sign-in
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/signin';
      // }
    }
    return Promise.reject(error);
  }
);
