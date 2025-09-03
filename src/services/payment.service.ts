import { axiosInstance } from "@/api/axios";
import {
  ConversionData,
  ConversionResult,
  ConvertRate,
  CreateDepositInterface,
  CreateWithdrawalInterface,
  ExternalTransferPayload,
  InternalTransferLimit,
  InternalTransferPayload,
  Payment,
  PaymentBank,
  PaymentMethod,
  PaymentQueries,
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

export const getPaymentHistory = async (
  paymentQuery?: PaymentQueries
): Promise<Payment[]> => {
  const { data } = await axiosInstance.get(
    `/payments?keyword=${paymentQuery?.keyword ?? ""}&status=${
      paymentQuery?.status ?? ""
    }&type=${paymentQuery?.type ?? ""}&methodSlug=${
      paymentQuery?.methodSlug ?? ""
    }`
  );
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
  const result = await axiosInstance.get(`/payments/${id}/verify`);
  return result.data;
};

export const internalTransfer = async (payload: InternalTransferPayload) => {
  const result = await axiosInstance.post(
    `/payments/internal-transfer`,
    payload
  );
  return result.data;
};

export const externalTransfer = async (payload: ExternalTransferPayload) => {
  const result = await axiosInstance.post(
    `/payments/external-transfer`,
    payload
  );
  return result.data;
};

export const currency = async (method: string): Promise<ConversionData[]> => {
  const result = await axiosInstance.get(
    `/payments/currency?methodSlug=${method}`
  );
  return result.data.data;
};

export const getRate = async (currency: string) => {
  const result = await axiosInstance.get(`/payments/rate`);
  return result.data.data;
};

export const convertRate = async (
  payload: ConvertRate
): Promise<ConversionResult> => {
  const result = await axiosInstance.post(
    `/payments/currency/convert`,
    payload
  );
  return result.data.data;
};

export const internalTransferLimit =
  async (): Promise<InternalTransferLimit> => {
    const result = await axiosInstance.get(`/payments/internal-transfer-limit`);
    return result.data.data;
  };
