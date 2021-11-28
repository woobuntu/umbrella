export interface CreatePayment {
  platform: string;

  type: string;

  amount: number;

  orderId?: string;

  paymentKey?: string;
}
