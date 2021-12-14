import { ObjectType } from '@nestjs/graphql';
import { DeliveryWithOutId } from './delivery-without-id.model';
import { OrdererWithOutId } from './orderer-without-id.model';

@ObjectType()
export class OrderRelatedInfo {
  orderer: OrdererWithOutId;
  delivery: DeliveryWithOutId;
}
