import { axiosInstance } from "@/api/axios";
import { CreateAccountInterface } from "@/interfaces/ui-interfac";
import {
  Account,
  AccountGroupInterface,
  AccountHistory,
  AccountLeverageInterface,
  AccountPassworInterface,
  CreateTradeAccount,
  GetAccountHistoryPayloadInterface,
} from "@/types";

export const getAccount = async () => {
  const { data } = await axiosInstance.get("/accounts");
  return data.data.data;
};

export const createAccount = async (
  payload: CreateTradeAccount
): Promise<Account[]> => {
  const { data } = await axiosInstance.post("/accounts", payload);
  return data.data;
};

export const getAccountDetail = async (id: string): Promise<Account> => {
  const { data } = await axiosInstance.get(`/accounts/${id}`);
  return data.data;
};

export const getAccountGroups = async (): Promise<AccountGroupInterface[]> => {
  const { data } = await axiosInstance.get(`/accounts/groups`);
  return data.data.data;
};

export const getOneAccountGroup = async (
  id: string
): Promise<AccountGroupInterface> => {
  const { data } = await axiosInstance.get(`/accounts/groups/${id}`);
  return data.data;
};

export const changeAccountPassword = async (
  payload: AccountPassworInterface
) => {
  const result = await axiosInstance.post(
    `/accounts/${payload.id}/change-password`,
    { password: payload.password }
  );
  return result.data;
};

export const changeAccountLeverage = async (
  payload: AccountLeverageInterface
) => {
  const result = await axiosInstance.post(
    `/accounts/${payload.id}/change-leverage`,
    { leverage: payload.leverage }
  );
  return result.data;
};

export const getAccountHistory = async (
  payload: GetAccountHistoryPayloadInterface
): Promise<AccountHistory[]> => {
  const result = await axiosInstance.get(
    `/accounts/${payload.id}/history?keyword=${payload.keyword}`
  );
  return result.data.data.data;
};
