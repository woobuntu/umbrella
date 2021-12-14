import { ObjectType } from '@nestjs/graphql';
import { Delivery } from '../delivery';
import { Orderer } from '../orderer';
import { PublicPayment } from '../payment';

@ObjectType()
export class PurchaseResult {
  orderer: Orderer;
  delivery: Delivery;
  payment: PublicPayment;
}
