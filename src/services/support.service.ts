import { axiosInstance } from "@/api/axios";
import {
  CreateSupportInterface,
  ReplyChat,
  SupportMessage,
  SupportTicketMessage,
  TicketFullQuery,
  TicketQuery,
} from "@/types/support.types";

export const createSupport = async (payload: CreateSupportInterface) => {
  const { data } = await axiosInstance.post(`/support/ticket`, payload);
  return data.data;
};

export const getSupport = async (
  ticketQuery: TicketQuery
): Promise<TicketFullQuery> => {
  const { data } = await axiosInstance.get(
    `/support/ticket?keyword=${ticketQuery.keyword}&page=${ticketQuery.page}&perPage=${ticketQuery.perPage}&status=${ticketQuery.status}`
  );
  return data.data;
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
