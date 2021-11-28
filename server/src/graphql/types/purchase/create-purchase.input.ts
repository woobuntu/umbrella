import { InputType } from '@nestjs/graphql';
import { CreateDeliveryInput } from '../delivery';
import { CreateOrdererInput } from '../orderer';
import { CreatePaymentInput } from '../payment';

@InputType()
export class CreatePurchaseInput {
  orderer: CreateOrdererInput;

  delivery: CreateDeliveryInput;

  payment: CreatePaymentInput;
}
