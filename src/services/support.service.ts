import { axiosInstance } from "@/api/axios";
import {
  CreateSupportInterface,
  ReplyChat,
  SupportMessage,
  SupportTicketMessage,
} from "@/types/support.types";

export const createSupport = async (payload: CreateSupportInterface) => {
  const { data } = await axiosInstance.post(`/support/ticket`, payload);
  return data.data;
};

export const getSupport = async (): Promise<SupportMessage[]> => {
  const { data } = await axiosInstance.get(`/support/ticket`);
  return data.data.data;
};

export const getTicketMessages = async (
  id: string
): Promise<SupportTicketMessage[]> => {
  const { data } = await axiosInstance.get(`/support/${id}/messages`);
  return data.data.data;
};

export const replyMessage = async (payload: ReplyChat) => {
  const { id, ...rest } = payload;
  const { data } = await axiosInstance.post(`/support/${id}/reply`, rest);
  return data;
};
