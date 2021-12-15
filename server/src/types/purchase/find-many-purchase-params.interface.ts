import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyPurchaseParams extends FindManyParams {
  cursor?: Prisma.PurchaseWhereUniqueInput;
  where?: Prisma.PurchaseWhereInput;
  orderBy?: Prisma.PurchaseOrderByWithRelationInput;
}
