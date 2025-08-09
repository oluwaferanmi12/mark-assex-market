import { axiosInstance } from "@/api/axios";
import { UpdateUserInterface, UserProfileInterface } from "@/types";
import {
  CreateKycFinance,
  Get2FA,
  GetKycResponse,
  NotificationPreference,
  PhoneRequest,
  PhoneVerify,
  SubmitKycInterface,
  Verify2fa,
} from "@/types/settings.types";

export const getUserProfile = async (): Promise<UserProfileInterface> => {
  const result = await axiosInstance.get("/users/me");
  return result.data.data;
};

export const saveUserProfile = async (payload: UpdateUserInterface) => {
  const { data } = await axiosInstance.patch("/users", payload);
  return data;
};

export const getKyc = async (): Promise<GetKycResponse> => {
  const { data } = await axiosInstance.get("/kyc");
  return data.data;
};

export const submitKyc = async (payload: FormData) => {
  const { data } = await axiosInstance.post("/kyc/document", payload, {
    headers: { "Content-Type": "multipart/formdata" },
  });
  return data;
};

export const getNotification = async () => {
  const { data } = await axiosInstance.get("/notification");
  return data;
};

export const getNotificationPreference =
  async (): Promise<NotificationPreference> => {
    const { data } = await axiosInstance.get("/notification/preference");
    return data.data;
  };

export const saveNotificationPreference = async (
  payload: NotificationPreference
) => {
  const { data } = await axiosInstance.patch(
    "/notification/preference",
    payload
  );
  return data;
};

export const generate2FA = async (): Promise<Get2FA> => {
  const { data } = await axiosInstance.get(`/security/security/2fa/generate`);
  return data.data;
};

export const verify2FA = async (payload: Verify2fa) => {
  const { data } = await axiosInstance.post("/security/2fa/verify");
  return data.data;
};

export const phoneRequest = async (payload: PhoneRequest) => {
  const { data } = await axiosInstance.post(`/kyc/phone-request`, payload);
  return data.data;
};

export const phoneVerify = async (payload: PhoneVerify) => {
  const { data } = await axiosInstance.post(`/kyc/phone-verify`, payload);
  return data.data;
};

export const saveFinanceInfo = async (payload: CreateKycFinance) => {
  const { data } = await axiosInstance.post(`/kyc/finance`, payload);
  return data.data;
};
