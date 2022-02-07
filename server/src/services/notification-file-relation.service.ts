import { Injectable } from '@nestjs/common';
import { FindManyNotificationFileRelationParams } from 'src/types/notification-file-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class NotificationFileRelationService {
  constructor(private prisma: PrismaService) {}

  async notificationFileRelations(
    params: FindManyNotificationFileRelationParams,
  ) {
    return this.prisma.notificationFileRelation.findMany(params);
  }
}
