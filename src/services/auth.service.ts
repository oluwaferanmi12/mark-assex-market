import { axiosInstance } from "@/api/axios";
import {
  CreateLoginInterface,
  CreateNewPasswordInterface,
  GoogleLogin,
  Login2fa,
  LoginInterface,
  RefreshTokenInterface,
  RegisterUserInterface,
  VerifyOtpInterface,
} from "@/types";
import { getAccessToken, getRefreshToken } from "@/utils/auth-helper";

export const login = async (payload: CreateLoginInterface) => {
  const result = await axiosInstance.post("/auth/login", payload);
  return result.data;
};

export const register = async (payload: RegisterUserInterface) => {
  const result = await axiosInstance.post("/auth/register", payload);
  return result.data;
};

export const verify = async (payload: VerifyOtpInterface) => {
  const result = await axiosInstance.post("/auth/verify", payload);
  return result.data;
};

export const resetPasswordRequest = async (email: string) => {
  const result = await axiosInstance.post("/auth/reset/requet", { email });
  return result;
};

export const confirmOtp = async (payload: VerifyOtpInterface) => {
  const result = await axiosInstance.post("/auth/reset/confirm-otp", payload);
  return result;
};

export const resetComplete = async (payload: CreateNewPasswordInterface) => {
  const result = await axiosInstance.post("/auth/reset/complete", payload);
  return result;
};

export const refreshToken = async (payload: RefreshTokenInterface) => {
  const result = await axiosInstance.post("/auth/refresh-token", payload);
  return result;
};

export const login2fa = async (payload: Login2fa) => {
  const result = await axiosInstance.post(`/auth/login/two-fa`, payload);
  return result.data;
};

export const logout = async () => {
  const result = await axiosInstance.post(`/auth/logout`, {
    refreshToken: getAccessToken(),
    accessToken: getRefreshToken(),
  });
  return result.data;
};

export const googleLogin = async (payload: GoogleLogin) => {
  const { data } = await axiosInstance.post(`/auth/google`, payload);
  return data;
};

export const impersonate = async (token: string) => {
  const { data } = await axiosInstance.post(`/auth/impersonate`, { token });
  return data;
};
