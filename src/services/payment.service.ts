import { axiosInstance } from "@/api/axios";
import { CreateDepositInterface, PaymentMethod } from "@/types";

export const paymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } = await axiosInstance.get("/payments/methods");
  return data.data;
};

export const deposit = async (payload: CreateDepositInterface) => {
  const { data } = await axiosInstance.post("/payments/deposit", payload);
  return data.data;
};
