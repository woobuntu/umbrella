import { ObjectType } from '@nestjs/graphql';
import { DeliveryWithOutPaymentId } from '../delivery';
import { OrdererWithOutPaymentId } from '../orderer';

@ObjectType()
export class OrdererAndDelivery {
  orderer: OrdererWithOutPaymentId;
  delivery: DeliveryWithOutPaymentId;
}
