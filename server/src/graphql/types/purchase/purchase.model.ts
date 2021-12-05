import { ObjectType } from '@nestjs/graphql';
import { PurchaseHistory } from './purchase-history.model';
import { CatalogOptionRelation } from '../catalog-option-relation';

@ObjectType()
export class Purchase {
  id: number;

  userId: string;

  catalogOptionRelationId: number;

  catalogOptionRelation: CatalogOptionRelation;

  ordererId: number;

  deliveryId: number;

  paymentId: number;

  amount: number;

  purchaseHistories: PurchaseHistory[];
}
