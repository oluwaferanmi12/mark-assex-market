import { axiosInstance } from "@/api/axios";
import { UpdateUserInterface, UserProfileInterface } from "@/types";
import { GetKycResponse, SubmitKycInterface } from "@/types/settings.types";

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
  const { data } = await axiosInstance.post("/kyc", payload, {
    headers: { "Content-Type": "multipart/formdata" },
  });
  return data;
};

export const getNotification = async () => {
  const { data } = await axiosInstance.get("/notification");
  return data;
};
