import { axiosInstance } from "@/api/axios";
import { GenericVerifyOtpInterface, VerifyOtpInterface } from "@/types";

export const sendGenericOtp = async () => {
  const { data } = await axiosInstance.post(`/otp/send`);
  return data.data;
};

export const verifyGenericOtp = async (payload: GenericVerifyOtpInterface) => {
  const { data } = await axiosInstance.post(`/otp/verify`, payload);
  return data.data;
};
