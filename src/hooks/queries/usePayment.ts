import {
  deposit,
  getPaymentHistory,
  getPaymentMethodDetails,
  paymentAccounts,
  paymentBanks,
  paymentMethods,
  resolveAccount,
  validateBalance,
  verifyPayment,
  withdraw,
} from "@/services";
import {
  CreateDepositInterface,
  CreateWithdrawalInterface,
  Payment,
  PaymentBank,
  PaymentMethod,
  PaymentResponseInterface,
  PreviouslyUsedBankAccounts,
  ResolveAccountPayload,
  UserBankAccountDetails,
  ValidateBalance,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPaymentMethods = (withdrawOnly = false) => {
  return useQuery<PaymentMethod[]>({
    queryFn: () => {
      return paymentMethods();
    },
    queryKey: ["payment-method"],
    select: (methods) =>
      withdrawOnly ? methods.filter((m) => m.isWithdraw) : methods,
  });
};

export const useDepositPayment = (sc: (data: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateDepositInterface) => {
      return deposit(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useGetPayments = () => {
  return useQuery<Payment[]>({
    queryFn: getPaymentHistory,
    queryKey: ["get-payments"],
  });
};

export const useGetPaymentMethodDetails = (slug: string) => {
  return useQuery<PaymentMethod>({
    queryKey: ["get-payment-method-details", slug],
    queryFn: ({ queryKey }) => {
      const [, slug] = queryKey; // Destructure slug from queryKey
      return getPaymentMethodDetails(slug as string);
    },
    enabled: !!slug, // only run if slug is provided
  });
};

export const useSaveWithdraw = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateWithdrawalInterface) => {
      return withdraw(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const usePaymentBanks = () => {
  return useQuery<PaymentBank[]>({
    queryFn: paymentBanks,
    queryKey: ["payment-bank"],
  });
};

export const usePaymentAccount = () => {
  return useQuery<PreviouslyUsedBankAccounts[]>({
    queryFn: paymentAccounts,
    queryKey: ["payment-accounts"],
  });
};

export const useResolvePaymentAccount = (
  sc: (val: UserBankAccountDetails) => void
) => {
  return useMutation({
    mutationFn: (payload: ResolveAccountPayload) => {
      return resolveAccount(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useValidateBalance = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: ValidateBalance) => {
      return validateBalance(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useVerifyPayment = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (id: string) => {
      return verifyPayment(id);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};
