import { axiosInstance } from "@/api/axios";
import {
  CreateDepositInterface,
  CreateWithdrawalInterface,
  Payment,
  PaymentBank,
  PaymentMethod,
  PreviouslyUsedBankAccounts,
  ResolveAccountPayload,
  UserBankAccountDetails,
  ValidateBalance,
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

export const paymentAccounts = async (): Promise<
  PreviouslyUsedBankAccounts[]
> => {
  const { data } = await axiosInstance.get(`/payments/payment-accounts`);

  return data.data.data;
};

export const paymentBanks = async (): Promise<PaymentBank[]> => {
  const { data } = await axiosInstance.get(`/payments/banks`);
  return data.data;
};

export const resolveAccount = async (
  payload: ResolveAccountPayload
): Promise<UserBankAccountDetails> => {
  const { data } = await axiosInstance.post(
    `/payments/resolve-account`,
    payload
  );
  return data.data;
};

export const validateBalance = async (payload: ValidateBalance) => {
  const result = await axiosInstance.post(
    `/payments/validate-balance`,
    payload
  );
  return result.data;
};

export const verifyPayment = async (id: string) => {
  const result = await axiosInstance.post(`/payments/${id}/verify`);
  return result.data;
};
