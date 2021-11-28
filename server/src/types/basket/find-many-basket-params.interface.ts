import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyBasketParams extends FindManyParams {
  cursor?: Prisma.BasketWhereUniqueInput;
  where?: Prisma.BasketWhereInput;
  orderBy?: Prisma.BasketOrderByWithRelationInput;
  include?: Prisma.BasketInclude;
}
