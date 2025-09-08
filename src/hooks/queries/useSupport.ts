import {
  createSupport,
  getSupport,
  getTicketMessages,
  replyMessage,
} from "@/services/support.service";
import {
  CreateSupportInterface,
  ReplyChat,
  TicketQuery,
} from "@/types/support.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateTicket = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateSupportInterface) => createSupport(payload),
    onSuccess: (val: any) => {
      sc(val);
    },
  });
};

export const useGetTickets = (ticketQuery: TicketQuery) => {
  return useQuery({
    queryFn: () => getSupport(ticketQuery),
    queryKey: ["get-ticket", ticketQuery],
  });
};

export const useGetTicketMessage = (id: string) => {
  return useQuery({
    queryFn: () => getTicketMessages(id),
    queryKey: ["get-ticket-message"],
    enabled: !!id,
    refetchInterval: 5000,
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
