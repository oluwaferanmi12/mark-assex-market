export interface ButtonInterface {
  text: string;
  loading: boolean;
  action: () => void;
  icon?: string;
  iconPosition?: "right" | "left";
  variant:
    | "green-bg"
    | "grey-bg"
    | "plain"
    | "blue-bg"
    | "white-bg"
    | "green-bg-faded"
    | "red-bg"
    | "green-faded-border"
    | "red-faded-border"
    | "grey-border";
  fullRounded?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
  buttonSmaller?: boolean;
  textBolder?: boolean;
  buttonDisabled?: boolean;
}

export interface SubNavInterface {
  text: string;
  slug: string;
  clickAction: () => void;
}

export interface NavObjectInterface {
  text: string;
  activeIcon: string;
  inactiveIcon: string;
  clickAction: () => void;
  slug: string;
  sub?: SubNavInterface[];
  activeState?: boolean;
}

export interface DropDownListInterface {
  text: string;
  id: string;
  clickAction?: () => void;
}

export interface OrderInterface {
  currency: string;
  type: string;
  orderType: string;
  executedPrice: number;
  profit: number;
  amount: number;
  status: string;
  createdAt: string;
}

export interface TableTextInterface {
  text: string | number;
  variant: "header" | "body";
  icon?: string;
}

export interface CreateAccountInterface {
  title: string;
  description: string;
  icon: string;
  benefitList: string[];
  active: boolean;
}

export interface TransactionInterface {
  id: string;
  amount: string;
  type: string;
  paymentMethod: string;
  status: string;
  date: string;
}

export interface BonusInterface {
  id: string;
  amount: number;
  type: string;
  status: "Active" | "Used" | "Expired";
  date: string;
  expiryDate: string;
}

export interface AnalyticsDataInterface {
  pair: string;
  openPrice: number;
  currentPrice: number;
  change: number;
  trend: "Bullish" | "Bearish";
  date: string;
}

export type SettingsIdType =
  | "account"
  | "documents"
  | "security"
  | "notification"
  | "agreement";

export type VerificationIdtype =
  | "email"
  | "phone"
  | "personal-info"
  | "personal-finance"
  | "document"
  | "loading";
export interface SettingsTabInterface {
  text: string;
  id: SettingsIdType;
}
export type ModuleVerifiedStatus = "verifying" | "verified" | "not-verified";

export interface ClientInterface {
  name: string;
  email: string;
  phone: string;
  ibAccount: string;
  status: "Active" | "Inactive";
  date: string;
}
