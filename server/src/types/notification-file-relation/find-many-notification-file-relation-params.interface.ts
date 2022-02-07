import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyNotificationFileRelationParams extends FindManyParams {
  cursor?: Prisma.NotificationFileRelationWhereUniqueInput;
  where?: Prisma.NotificationFileRelationWhereInput;
  orderBy?: Prisma.NotificationFileRelationOrderByWithRelationInput;
}
