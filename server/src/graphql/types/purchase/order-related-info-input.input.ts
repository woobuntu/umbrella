import { InputType } from '@nestjs/graphql';
import { DeliveryWithOutIdInput } from './delivery-without-id-input.input';
import { OrdererWithOutIdInput } from './orderer-without-id-input.input';

@InputType()
export class OrderRelatedInfoInput {
  orderer: OrdererWithOutIdInput;
  delivery: DeliveryWithOutIdInput;
}
