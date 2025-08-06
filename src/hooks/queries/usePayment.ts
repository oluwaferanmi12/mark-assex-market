import {
  deposit,
  getPaymentHistory,
  getPaymentMethodDetails,
  paymentAccounts,
  paymentBanks,
  paymentMethods,
  resolveAccount,
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
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";



export const useGetPaymentMethods = () => {
  return useQuery<PaymentMethod[]>({
    queryFn: paymentMethods,
    queryKey: ["payment-method"],
  });
};

export const useDepositPayment = (
  sc: (data: PaymentResponseInterface) => void
) => {
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
