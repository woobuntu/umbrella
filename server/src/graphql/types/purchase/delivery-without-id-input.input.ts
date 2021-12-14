import { InputType, OmitType } from '@nestjs/graphql';
import { Delivery } from '../delivery';

@InputType()
export class DeliveryWithOutIdInput extends OmitType(
  Delivery,
  ['id'],
  InputType,
) {}
