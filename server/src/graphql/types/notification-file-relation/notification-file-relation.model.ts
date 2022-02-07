import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class NotificationFileRelation {
  id: number;

  notificationId: number;

  fileId: number;

  file: File;
}
