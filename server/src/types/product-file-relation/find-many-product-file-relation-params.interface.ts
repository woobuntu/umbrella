import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyProductFileRelation extends FindManyParams {
  cursor?: Prisma.ProductFileRelationWhereUniqueInput;
  where?: Prisma.ProductFileRelationWhereInput;
  orderBy?: Prisma.ProductFileRelationOrderByWithRelationInput;
}
