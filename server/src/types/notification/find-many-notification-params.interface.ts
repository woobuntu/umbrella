import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyNotificationParams extends FindManyParams {
  cursor?: Prisma.NotificationWhereUniqueInput;
  where?: Prisma.NotificationWhereInput;
  orderBy?: Prisma.NotificationOrderByWithRelationInput;
}
