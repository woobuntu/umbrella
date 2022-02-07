import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyLnbParams extends FindManyParams {
  cursor?: Prisma.LnbWhereUniqueInput;
  where?: Prisma.LnbWhereInput;
  orderBy?: Prisma.LnbOrderByWithRelationInput;
}
