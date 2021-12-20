import { InputType } from '@nestjs/graphql';
import { CreateDeliveryInput } from '../delivery';
import { CreateOrdererInput } from '../orderer';

@InputType()
export class CreatePaymentInput {
  platform: string;

  type: string;

  amount: number;

  deliveryFee: number;

  orderStatus?: string;

  tid?: string;

  orderId?: string;

  paymentKey?: string;

  orderer: CreateOrdererInput;

  delivery: CreateDeliveryInput;
}
