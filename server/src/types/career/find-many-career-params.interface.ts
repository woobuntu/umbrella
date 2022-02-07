import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyCareerParams extends FindManyParams {
  cursor?: Prisma.CareerWhereUniqueInput;
  where?: Prisma.CareerWhereInput;
  orderBy?: Prisma.CareerOrderByWithRelationInput;
}
