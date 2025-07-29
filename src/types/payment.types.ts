export interface PaymentMethod {
  name: string;
  slug: string;
  description: string;
  status: "ACTIVE";
  minAmount: number;
  maxAmount: number;
  time: string;
  image: string;
}

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface CreateDepositInterface {
  amount: number;
  chargeHash: string;
  methodSlug: string;
  toAccount: string;
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
}
