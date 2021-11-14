import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyCatalogsParams extends FindManyParams {
  cursor?: Prisma.CatalogWhereUniqueInput;
  where?: Prisma.CatalogWhereInput;
  orderBy?: Prisma.CatalogOrderByWithRelationInput;
}
