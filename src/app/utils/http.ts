import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.6:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
