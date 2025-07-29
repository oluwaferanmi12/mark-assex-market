import { CreateAccountInterface } from "@/interfaces/ui-interfac";
import { createAccount, getAccount } from "@/services";
import { Account, CreateTradeAccount } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAccount = () => {
  return useQuery<Account[]>({
    queryKey: ["get-account"],
    queryFn: getAccount,
  });
};

export const useCreateTradeAccount = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateTradeAccount) => {
      return createAccount(payload);
    },
    mutationKey: ["create-trade-account"],
    onSuccess: (data) => {
      sc(data);
    },
  });
};
