import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateNotificationInput,
  Notification,
  UpdateNotificationInput,
} from 'src/graphql/types/notification';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  DayjsService,
  FileService,
  NotificationFileRelationService,
  NotificationService,
} from 'src/services';

@Resolver((of) => Notification)
export class NotificationResolver {
  constructor(
    private notificationService: NotificationService,
    private dayjsService: DayjsService,
    private fileService: FileService,
    private notificationFileRelationService: NotificationFileRelationService,
  ) {}

  @Query((returns) => Notification)
  async notification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.notification({
      id,
    });
  }

  @Query((returns) => [Notification])
  async notifications() {
    return this.notificationService.notifications({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  @ResolveField()
  async notificationFileRelations(@Parent() notification: Notification) {
    return this.notificationFileRelationService.notificationFileRelations({
      where: {
        notificationId: notification.id,
      },
    });
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Notification)
  async createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    const { title, content, timestamp, files } = createNotificationInput;
    const fileList = await Promise.all(files);

    // 1. 파일이 있으면 파일 업로드 및 db 저장
    const createdFiles = await this.fileService.createFiles({
      KeyPrefix: `notifications/${title}`,
      files: fileList,
    });

    // 2. quilljs delta content 변환
    const convertedCreateNotificationInput =
      await this.notificationService.convertContent({
        title,
        content,
      });

    const currentTime = this.dayjsService.getCurrentTime();

    const idOfCreatedFiles = createdFiles.map(({ id }) => ({ fileId: id }));

    // 3. 활동실적 및 이력 생성
    return this.notificationService.createNotification({
      ...convertedCreateNotificationInput,
      timestamp,
      notificationFileRelations: {
        createMany: {
          data: idOfCreatedFiles,
        },
      },
      notificationHistories: {
        create: {
          ...convertedCreateNotificationInput,
          timestamp,
          from: currentTime,
        },
      },
    });
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Notification)
  async updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {
    const { id, title, content, timestamp, files, deletedFiles } =
      updateNotificationInput;

    // 1. files args로 들어온 것은 새로 추가된 파일이므로 s3에 업로드
    const fileList = await Promise.all(files);
    const createdFiles = await this.fileService.createFiles({
      KeyPrefix: `notifications/${title}`,
      files: fileList,
    });

    // 2. 삭제된 파일 제거 처리
    await this.fileService.deleteFiles(deletedFiles);

    // 3. quilljs delta content 변환
    const convertedUpdateNotificationInput =
      await this.notificationService.convertContent({
        title,
        content,
      });

    const lastNotificationHistory =
      await this.notificationService.notificationHistory({
        notificationId: id,
        to: null,
      });

    const {
      id: lastNotificationHistoryId,
      notificationId,
      ...dataForNewNotificationHistory
    } = lastNotificationHistory;

    await this.notificationService.compareContent({
      prevContent: lastNotificationHistory.content,
      nextContent: convertedUpdateNotificationInput.content,
    });

    const currentTime = this.dayjsService.getCurrentTime();

    const idOfCreatedFiles = createdFiles.map(({ id }) => ({ fileId: id }));

    if (
      lastNotificationHistory.title !== title ||
      lastNotificationHistory.content !==
        convertedUpdateNotificationInput.content ||
      lastNotificationHistory.timestamp !== timestamp ||
      files.length ||
      deletedFiles.length
    ) {
      return this.notificationService.updateNotification({
        where: {
          id,
        },
        data: {
          ...convertedUpdateNotificationInput,
          timestamp: currentTime,
          notificationFileRelations: {
            createMany: {
              data: idOfCreatedFiles,
            },
          },
          notificationHistories: {
            update: {
              where: {
                id: lastNotificationHistoryId,
              },
              data: {
                to: currentTime,
              },
            },
            create: {
              ...dataForNewNotificationHistory,
              ...convertedUpdateNotificationInput,
              timestamp,
              from: currentTime,
            },
          },
        },
      });
    }
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Notification)
  async deleteNotification(@Args('id', { type: () => Int }) id: number) {
    const [_, deletedNotification] =
      await this.notificationService.deleteNotification({
        id,
      });
    return deletedNotification;
  }
}
