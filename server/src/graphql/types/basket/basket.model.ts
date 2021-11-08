import { ObjectType } from '@nestjs/graphql';
import { CatalogOptionRelation } from '../catalog-option-relation';

@ObjectType()
export class Basket {
  id: number;

  userId: string;

  catalogOptionRelationId: number;

  amount: number;

  catalogOptionRelation: CatalogOptionRelation;
}
