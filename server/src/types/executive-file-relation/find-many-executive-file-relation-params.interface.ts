import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyExecutiveFileRelationParams extends FindManyParams {
  cursor?: Prisma.ExecutiveFileRelationWhereUniqueInput;
  where?: Prisma.ExecutiveFileRelationWhereInput;
  orderBy?: Prisma.ExecutiveFileRelationOrderByWithRelationInput;
}
