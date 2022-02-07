import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyFileParams extends FindManyParams {
  cursor?: Prisma.FileWhereUniqueInput;
  where?: Prisma.FileWhereInput;
  orderBy?: Prisma.FileOrderByWithRelationInput;
}
