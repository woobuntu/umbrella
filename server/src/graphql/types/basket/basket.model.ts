import { ObjectType } from '@nestjs/graphql';
import { ProductOptionRelation } from '../product-option-relation';

@ObjectType()
export class Basket {
  id: number;

  userId: string;

  productOptionRelationId: number;

  quantity: number;

  productOptionRelation: ProductOptionRelation;
}
