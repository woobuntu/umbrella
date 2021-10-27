import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyMetaFileRelationParams extends FindManyParams {
  cursor?: Prisma.MetaFileRelationWhereUniqueInput;
  where?: Prisma.MetaFileRelationWhereInput;
  orderBy?: Prisma.MetaFileRelationOrderByWithRelationInput;
}
