import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Purchase {
  id: number;

  userId: string;

  catalogOptionRelationId: number;

  ordererId: number;

  deliveryId: number;

  paymentId: number;
}
