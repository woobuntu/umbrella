import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  id: number;

  platform: string;

  type: string;

  amount: number;

  deliveryFee: number;

  orderId?: string;

  paymentKey?: string;
}
