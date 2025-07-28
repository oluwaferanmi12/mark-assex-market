import { deposit, paymentMethods } from "@/services";
import {
  CreateDepositInterface,
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
