import { ObjectType } from '@nestjs/graphql';
import { Delivery } from '../delivery';

@ObjectType()
export class UserDeliveryRelation {
  id: number;

  userId: string;

  deliveryId: number;

  delivery: Delivery;

  default: boolean;
}
