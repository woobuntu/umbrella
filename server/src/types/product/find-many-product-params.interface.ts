import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyProductParams extends FindManyParams {
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
}
