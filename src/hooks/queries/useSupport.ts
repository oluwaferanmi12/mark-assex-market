import {
  createSupport,
  getSupport,
  getTicketMessages,
} from "@/services/support.service";
import { CreateSupportInterface } from "@/types/support.types";
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
    enabled: !!id
  });
};
