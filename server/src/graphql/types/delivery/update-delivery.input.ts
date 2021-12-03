import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDeliveryInput } from './create-delivery.input';

@InputType()
export class UpdateDeliveryInput extends PartialType(CreateDeliveryInput) {}
