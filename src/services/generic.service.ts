import { axiosInstance } from "@/api/axios";
import {
  GenericVerifyOtpInterface,
  SendGenericOtp,
  VerifyOtpInterface,
} from "@/types";

export const sendGenericOtp = async (payload: SendGenericOtp) => {
  const { data } = await axiosInstance.post(`/otp/send`, payload);
  return data.data;
};

export const verifyGenericOtp = async (payload: GenericVerifyOtpInterface) => {
  const { data } = await axiosInstance.post(`/otp/verify`, payload);
  return data.data;
};
