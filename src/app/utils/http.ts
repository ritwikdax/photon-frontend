import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.106:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
