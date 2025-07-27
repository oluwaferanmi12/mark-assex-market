import { paymentMethods } from "@/services";
import { PaymentMethod } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentMethods = () => {
  return useQuery<PaymentMethod[]>({
    queryFn: paymentMethods,
    queryKey: ["payment-method"],
  });
};
