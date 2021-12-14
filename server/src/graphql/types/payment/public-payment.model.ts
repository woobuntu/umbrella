import { ObjectType, OmitType } from '@nestjs/graphql';
import { Payment } from './payment.model';

@ObjectType()
export class PublicPayment extends OmitType(Payment, [
  'orderId',
  'paymentKey',
  'tid',
]) {}
