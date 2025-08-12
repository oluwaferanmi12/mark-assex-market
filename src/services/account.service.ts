import { axiosInstance } from "@/api/axios";
import { CreateAccountInterface } from "@/interfaces/ui-interfac";
import { Account, AccountGroupInterface, CreateTradeAccount } from "@/types";

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
  return data.data.data
};
