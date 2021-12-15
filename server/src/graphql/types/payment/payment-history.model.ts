import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentHistory {
  id: number;

  platform: string;

  type: string;

  amount: number;

  deliveryFee: number;

  orderStatus?: string;

  tid?: string;

  orderId?: string;

  paymentKey?: string;

  userId: string;

  from: Date;

  to?: Date;
}
