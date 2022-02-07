import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyPerformanceParams extends FindManyParams {
  cursor?: Prisma.PerformanceWhereUniqueInput;
  where?: Prisma.PerformanceWhereInput;
  orderBy?: Prisma.PerformanceOrderByWithRelationInput;
}
