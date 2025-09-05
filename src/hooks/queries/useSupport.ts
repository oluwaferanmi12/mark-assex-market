import { createSupport } from "@/services/support.service";
import { CreateSupportInterface } from "@/types/support.types";
import { useMutation } from "@tanstack/react-query";

export const useCreateTicket = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateSupportInterface) => createSupport(payload),
  });
};
