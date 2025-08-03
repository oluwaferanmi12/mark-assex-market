import { axiosInstance } from "@/api/axios";
import {
  CreateDepositInterface,
  CreateWithdrawalInterface,
  Payment,
  PaymentMethod,
} from "@/types";

export const paymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } = await axiosInstance.get("/payments/methods");
  return data.data;
};

export const deposit = async (payload: CreateDepositInterface) => {
  const { data } = await axiosInstance.post("/payments/deposit", payload);
  return data.data;
};

export const getPaymentHistory = async (): Promise<Payment[]> => {
  const { data } = await axiosInstance.get("/payments");
  return data.data.data;
};

export const getPaymentMethodDetails = async (
  slug: string
): Promise<PaymentMethod> => {
  const { data } = await axiosInstance.get(`/payments/method/${slug}`);
  return data.data;
};

export const withdraw = async (payload: CreateWithdrawalInterface) => {
  const { data } = await axiosInstance.post("/payments/withdraw", payload);
  return data;
};
