import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://winsteadglobal.com/api",
  withCredentials: true, // optional (if cookies/auth needed)
  timeout: 60000, // 60s
});
