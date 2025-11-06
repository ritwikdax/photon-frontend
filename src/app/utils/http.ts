import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://photon-backend-c8wj.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
