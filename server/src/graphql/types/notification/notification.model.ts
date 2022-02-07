import { ObjectType } from '@nestjs/graphql';
import { NotificationFileRelation } from '../notification-file-relation';

@ObjectType()
export class Notification {
  id: number;

  title: string;

  content: string;

  timestamp: Date;

  notificationFileRelations: NotificationFileRelation[];
}
