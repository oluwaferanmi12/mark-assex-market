import { axiosInstance } from "@/api/axios";
import { CreateSupportInterface } from "@/types/support.types";

export const createSupport = async (payload: CreateSupportInterface) => {
  const { data } = await axiosInstance.post(`/support/ticket`, payload);
  return data.data;
};

export const getSupport = async () => {
  const {data} = await axiosInstance.get(`/support/ticket`);
  return data.data
}