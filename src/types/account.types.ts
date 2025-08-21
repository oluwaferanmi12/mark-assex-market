import { UserProfileInterface } from "./user.types";

export interface CreateTradeAccount {
  accountGroupId: string;
  password: string;
  nickname: string;
  leverage: string;
  platform: string;
  amount: number;
}

export interface AccountGroup {
  id: string;
  name: string;
  type: "DEMO" | "LIVE";
  description: string;
  leverage: number;
  spread: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface Account {
  id: string;
  userId: string;
  leverage: number;
  balance: number;
  mt5Id: string;
  traderPassword: string;
  investorPassword: string;
  server: string;
  accountGroupId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  user: UserProfileInterface;
  accountGroup: AccountGroup;
  equity: number;
}

export interface GenericVerifyOtpInterface {
  otp: string;
  withToken: boolean;
}

export interface AccountGroupInterface {
  id: string;
  name: string;
  type: "LIVE" | "DEMO";
  description: string;
  leverage: number;
  spread: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  mustVerify: boolean;
  applyLimit: number;
  minDeposit: string;
  maxDeposit: string;
  minWithdrawal: string;
  maxWithdrawal: string;
  commission: number;
  logo: null | string;
}

export interface AccountPassworInterface {
  id: string;
  password: string;
}

export interface AccountLeverageInterface {
  id: string;
  leverage: number;
}

export interface GetAccountHistoryPayloadInterface {
  id: string;
  keyword: string;
  type: string;
}

export interface AccountHistory {
  id: string;
  orderId: string;
  symbol: string;
  price: number;
  profit: number;
  stopLoss: number;
  takeProfit: number;
  openLotSize: number;
  closeLotSize: number;
  type: "BUY" | "SELL" | string;
  date: string;
}
