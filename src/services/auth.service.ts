import { axiosInstance } from "@/api/axios";
import { RegisterUserInterface } from "@/types";

export const login = async (payload: { email: string; password: string }) => {
  const result = await axiosInstance.post("/auth/login", payload);
  return result.data;
};

export const register = async (payload: RegisterUserInterface) => {
  const result = await axiosInstance.post("/auth/register", payload);
  return result.data;
};

export const verify = async (payload: { otp: string; email: string }) => {
  const result = await axiosInstance.post("/auth/verify", payload);
  return result.data;
};

export const resetPasswordRequest = async (email: string) => {
  const result = await axiosInstance.post("/auth/reset/requet", { email });
  return result;
};

export const confirmOtp = async (payload: { email: string; otp: string }) => {
  const result = await axiosInstance.post("/auth/reset/confirm-otp", payload);
  return result;
};

export const resetComplete = async (payload: {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  const result = await axiosInstance.post("/auth/reset/complete", payload);
  return result;
};
