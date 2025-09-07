import {
  createSupport,
  getSupport,
  getTicketMessages,
  replyMessage,
} from "@/services/support.service";
import { CreateSupportInterface, ReplyChat } from "@/types/support.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateTicket = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateSupportInterface) => createSupport(payload),
  });
};

export const useGetTickets = () => {
  return useQuery({
    queryFn: () => getSupport(),
    queryKey: ["get-ticket"],
  });
};

export const useGetTicketMessage = (id: string) => {
  return useQuery({
    queryFn: () => getTicketMessages(id),
    queryKey: ["get-ticket-message"],
    enabled: !!id,
  });
};

export const useReply = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: ReplyChat) => {
      return replyMessage(payload);
    },
    onSuccess: (data: any) => {
      sc(data);
    },
  });
};
