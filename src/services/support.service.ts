import { axiosInstance } from "@/api/axios";
import { CreateSupportInterface, SupportMessage } from "@/types/support.types";

export const createSupport = async (payload: CreateSupportInterface) => {
  const { data } = await axiosInstance.post(`/support/ticket`, payload);
  return data.data;
};

export const getSupport = async (): Promise<SupportMessage[]> => {
  const { data } = await axiosInstance.get(`/support/ticket`);
  return data.data.data;
};

export const getTicketMessages = async (id: string) => {
  const { data } = await axiosInstance.get(`/support/${id}/messages`);
  return data.data
};
