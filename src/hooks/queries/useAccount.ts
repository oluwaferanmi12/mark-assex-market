import { CreateAccountInterface } from "@/interfaces/ui-interfac";
import {
  changeAccountLeverage,
  changeAccountPassword,
  createAccount,
  getAccount,
  getAccountDetail,
  getAccountGroups,
  getOneAccountGroup,
} from "@/services";
import {
  Account,
  AccountGroupInterface,
  AccountLeverageInterface,
  AccountPassworInterface,
  CreateTradeAccount,
} from "@/types";
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

export const useGetAccountDetail = (id: string) => {
  return useQuery<Account>({
    queryKey: ["get-account-detail", id],
    queryFn: () => getAccountDetail(id),
    enabled: !!id,
  });
};

export const useGetAccountGroups = () => {
  return useQuery({
    queryFn: getAccountGroups,
    queryKey: ["account-id"],
  });
};

export const useGetOneAccountGroup = (id: string) => {
  return useQuery({
    queryFn: () => getOneAccountGroup(id),
    queryKey: ["get-one-account-group", id],
    enabled: !!id,
  });
};

export const useChangeAccountPassword = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: AccountPassworInterface) => {
      return changeAccountPassword(payload);
    },
    onSuccess: (data) => {
      return sc(data);
    },
  });
};

export const useChangeAccountLeverage = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: AccountLeverageInterface) => {
      return changeAccountLeverage(payload);
    },
    onSuccess: (data) => {
      return sc(data);
    },
  });
};
