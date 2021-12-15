import { ObjectType, OmitType } from '@nestjs/graphql';
import { Delivery } from './delivery.model';

@ObjectType()
export class DeliveryWithOutPaymentId extends OmitType(Delivery, [
  'paymentId',
]) {}
