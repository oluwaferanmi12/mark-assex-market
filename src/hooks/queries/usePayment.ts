import { deposit, getPaymentHistory, paymentMethods } from "@/services";
import {
  CreateDepositInterface,
  Payment,
  PaymentMethod,
  PaymentResponseInterface,
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
