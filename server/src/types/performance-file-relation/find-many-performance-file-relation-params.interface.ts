import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyPerformanceFileRelationParams extends FindManyParams {
  cursor?: Prisma.PerformanceFileRelationWhereUniqueInput;
  where?: Prisma.PerformanceFileRelationWhereInput;
  orderBy?: Prisma.PerformanceFileRelationOrderByWithRelationInput;
}
