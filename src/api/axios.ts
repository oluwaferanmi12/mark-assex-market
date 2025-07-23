import { LoginInterface, LoginUserInterface } from "@/types";
import {
  getAccessToken,
  getRefreshToken,
  saveLocalUser,
} from "@/utils/auth-helper";
import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    // i can try to see what the response looks like and then fashion the calls based off this
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorMessage = error?.response?.data?.message ?? error?.message;
    if (error?.response?.status === 401) {
      window.location.href = "/login";
    }
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);
