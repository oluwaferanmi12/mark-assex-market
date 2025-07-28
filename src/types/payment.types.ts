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

export interface CreateDepositInterface {
  amount: number;
  chargeHash: string;
  methodSlug: string;
  toAccount: string;
}

export interface PaymentResponseInterface {
  reference: string;
  checkout_url: string;
}
