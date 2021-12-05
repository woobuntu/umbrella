import { ObjectType } from '@nestjs/graphql';
import { PurchaseHistory } from './purchase-history.model';
import { CatalogOptionRelation } from '../catalog-option-relation';
import { Delivery } from '../delivery';
import { PublicPayment } from '../payment';

@ObjectType()
export class Purchase {
  id: number;

  userId: string;

  catalogOptionRelationId: number;

  catalogOptionRelation: CatalogOptionRelation;

  ordererId: number;

  deliveryId: number;

  delivery: Delivery;

  paymentId: number;

  payment: PublicPayment;

  amount: number;

  purchaseHistories: PurchaseHistory[];
}
