export interface PaymentMethod {
  name: string;
  slug: string;
  description: string;
  status: "ACTIVE";
  minAmount: number;
  maxAmount: number;
  time: string;
  image: string;
  isCrypto: boolean;
  isWithdraw: boolean;
}

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface CreateDepositInterface {
  amount: number;
  chargeHash: string;
  methodSlug: string;
  toAccount: string;
  currency: string;
}

export interface PaymentResponseInterface {
  reference: string;
  checkout_url: string;
  address?: string;
}

export interface PaymentUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface TransactionPaymentMethod {
  name: string;
  slug: string;
}
export interface Payment {
  id: string;
  transactionId: null | string;
  reference: string;
  phoneNumber: string | null;
  userId: string;
  amount: string;
  methodId: string;
  paymentAccountId: string | null;
  type: string;
  description: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  paymentAddressId: string | null;
  user: PaymentUser;
  method: TransactionPaymentMethod;
  reason: string;
}

export interface CreateWithdrawalInterface {
  fromAccount: string;
  currency: string;
  amount: number;
  methodSlug: string;
  paymentAccountId: string;
  accountNumber: string;
  bank: string;
  bankCode: string;
  accountName: string;
  routingNo: string;
  walletAddress: string;
  coin: string;
  network: string;
  token: string;
}

export interface PaymentBank {
  name: string;
  slug: string;
  code: string;
  country: string;
  nibss_bank_code: string;
}

export interface ResolveAccountPayload {
  bankCode: string;
  accountNumber: string;
}

export interface UserBankAccountDetails {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

export interface PreviouslyUsedBankAccounts {
  id: string;
  userId: string;
  methodId: string;
  accountNumber: string;
  bank: string;
  bankCode: string;
  accountName: string;
  routingNo: string;
  walletAddress: string;
  coin: string;
  network: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidateBalance {
  accountId: string;
  amount: number;
}

export interface BankInterfaceForTransfer {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  expiry_date_in_utc: string;
}

export interface DepositBankTransferResponse {
  currency: string;
  id?: string;
  amount: number;
  amount_expected: number;
  fee: number;
  vat: number;
  reference: string;
  payment_reference: string;
  status: string;
  narration: string;
  merchant_bears_cost: boolean;
  bank_account: BankInterfaceForTransfer;
  customer: {
    name: string;
    email: string;
  };
}

export interface PaymentVerifyInterface {
  fee: number;
  amount: number;
  status: string;
  currency: string;
  reference: string;
  transaction_date: null | string;
  payment_reference: string;
  virtual_bank_account_details: string | null;
}

export interface PaymentQueries {
  status: "FAILED" | "PENDING" | "SUCCESS" | string;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | string;
  keyword: string;
  methodSlug: string;
}

export enum PaymentMethodTypes {
  KoraHq = "kora-hq",
  Paystack = "paystack",
  Cryptochill = "cryptochill",
  InternalBankTransfer = "internal-bank-transfer",
  DebitCard = "debit-card",
  TetherUsdtErc20 = "tether-usdt-erc20",
  TetherUsdtTrc20 = "tether-usdt-trc20",
  Btc = "btc",
  Eth = "eth",
  Trx = "trx",
}

export interface InternalTransferPayload {
  fromAccount: string;
  toAccount: string;
  amount: number;
}

export interface ExternalTransferPayload {
  fromAccount: string;
  email: string;
  amount: number;
  token: string;
}

export interface ConvertRate {
  currency: string;
  amount: number;
}

export interface ConversionData {
  currency: string;
}
export interface ConversionResult {
  amount: number;
  amountInCurrency: number;
  base: string;
  rate: number;
  target: string;
}
