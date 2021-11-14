import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyCatalogFileRelation extends FindManyParams {
  cursor?: Prisma.CatalogFileRelationWhereUniqueInput;
  where?: Prisma.CatalogFileRelationWhereInput;
  orderBy?: Prisma.CatalogFileRelationOrderByWithRelationInput;
}
