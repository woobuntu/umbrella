import { Prisma } from '.prisma/client';
import { FindManyParams } from '../base';

export interface FindManyUserDeliveryRelationParams extends FindManyParams {
  cursor?: Prisma.UserDeliveryRelationWhereUniqueInput;
  where?: Prisma.UserDeliveryRelationWhereInput;
  orderBy?: Prisma.UserDeliveryRelationOrderByWithRelationInput;
}
