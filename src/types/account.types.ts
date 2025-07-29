import { UserProfileInterface } from "./user.types";

export interface CreateTradeAccount {
  accountGroupId: string;
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
}
