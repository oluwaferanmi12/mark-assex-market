import {
  convertRate,
  currency,
  deposit,
  externalTransfer,
  getPaymentHistory,
  getPaymentMethodDetails,
  internalTransfer,
  paymentAccounts,
  paymentBanks,
  paymentMethods,
  resolveAccount,
  validateBalance,
  verifyPayment,
  withdraw,
} from "@/services";
import {
  ConvertRate,
  CreateDepositInterface,
  CreateWithdrawalInterface,
  ExternalTransferPayload,
  InternalTransferPayload,
  Payment,
  PaymentBank,
  PaymentMethod,
  PaymentQueries,
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
      withdrawOnly
        ? methods.filter((m) => m.isWithdraw)
        : methods.filter((m) => m.status === "ACTIVE"),
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

export const useGetPayments = (payload: PaymentQueries) => {
  return useQuery<Payment[]>({
    queryFn: () => getPaymentHistory(payload),
    queryKey: ["get-payments", payload],
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

export const useVerifyPayment = (id: string, refetchActive: boolean) => {
  return useQuery({
    queryFn: () => {
      return verifyPayment(id);
    },
    queryKey: ["verify-payment"],
    enabled: !!id,
    refetchInterval: refetchActive ? 10000 : false,
  });
};

export const useInternalTransfer = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: InternalTransferPayload) => internalTransfer(payload),
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useExternalTransfer = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: ExternalTransferPayload) => externalTransfer(payload),
    onSuccess: (val: any) => {
      sc(val);
    },
  });
};

export const useGetCurrency = (method: string) => {
  return useQuery({
    queryFn: () => currency(method),
    queryKey: ["currency"],
    enabled: !!method,
  });
};

export const useConvertRate = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: ConvertRate) => {
      return convertRate(payload);
    },
    onSuccess: (val) => {
      sc(val);
    },
  });
};
