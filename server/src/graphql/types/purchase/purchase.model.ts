import { ObjectType } from '@nestjs/graphql';
import { ProductOptionRelation } from '../product-option-relation';

@ObjectType()
export class Purchase {
  id: number;

  productOptionRelationId?: number;

  paymentId: number;

  quantity: number;

  productOptionRelation?: ProductOptionRelation;
}
