import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  withCredentials: true, // optional (if cookies/auth needed)
  timeout: 60000, // 60s
});
