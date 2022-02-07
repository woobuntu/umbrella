import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { NotificationFileRelation } from 'src/graphql/types/notification-file-relation';
import { FileService } from 'src/services';

@Resolver((of) => NotificationFileRelation)
export class NotificationFileRelationResolver {
  constructor(private fileService: FileService) {}

  @ResolveField()
  async file(@Parent() notificationFileRelation: NotificationFileRelation) {
    return this.fileService.file({
      id: notificationFileRelation.fileId,
    });
  }
}
