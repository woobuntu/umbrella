import { ObjectType } from '@nestjs/graphql';
import { Delivery } from '../delivery';
import { Orderer } from '../orderer';
import { Purchase } from '../purchase';
import { PaymentHistory } from './payment-history.model';

@ObjectType()
export class Payment {
  id: number;

  platform: string;

  type: string;

  amount: number;

  deliveryFee: number;

  orderStatus?: string;

  tid?: string;

  orderId?: string;

  paymentKey?: string;

  delivery?: Delivery;

  orderer?: Orderer;

  purchases: Purchase[];

  paymentHistories: PaymentHistory[];
}
