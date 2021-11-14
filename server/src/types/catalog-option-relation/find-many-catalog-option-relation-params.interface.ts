import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyCatalogOptionRelationParams extends FindManyParams {
  cursor?: Prisma.CatalogOptionRelationWhereUniqueInput;
  where?: Prisma.CatalogOptionRelationWhereInput;
  orderBy?: Prisma.CatalogOptionRelationOrderByWithRelationInput;
}
