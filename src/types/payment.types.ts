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
