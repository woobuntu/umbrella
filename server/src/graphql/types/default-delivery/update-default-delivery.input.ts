import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { DefaultDelivery } from './default-delivery.model';

@InputType()
export class UpdateDefaultDeliveryInput extends PartialType(
  OmitType(DefaultDelivery, ['id', 'userId', 'user']),
  InputType,
) {}
