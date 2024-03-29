import { InputType, OmitType } from '@nestjs/graphql';
import { Delivery } from './delivery.model';

@InputType()
export class CreateDeliveryInput extends OmitType(
  Delivery,
  ['paymentId'],
  InputType,
) {}
