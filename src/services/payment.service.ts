import { axiosInstance } from "@/api/axios";
import { PaymentMethod } from "@/types";

export const paymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } = await axiosInstance.get("/payments/methods");
  return data.data;
};
