import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyProductOptionRelationParams extends FindManyParams {
  cursor?: Prisma.ProductOptionRelationWhereUniqueInput;
  where?: Prisma.ProductOptionRelationWhereInput;
  orderBy?: Prisma.ProductOptionRelationOrderByWithRelationInput;
}
