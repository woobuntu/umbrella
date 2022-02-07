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
  CreatePerformanceInput,
  Performance,
  UpdatePerformanceInput,
} from 'src/graphql/types/performance';
import { AdminGuard } from 'src/guards/admin.guard';
import { DayjsService, FileService, PerformanceService } from 'src/services';
import { PerformanceFileRelationService } from 'src/services/performance-file-relation.service';

@Resolver((of) => Performance)
export class PerformanceResolver {
  constructor(
    private performanceService: PerformanceService,
    private dayjsService: DayjsService,
    private fileService: FileService,
    private performanceFileRelationService: PerformanceFileRelationService,
  ) {}

  @Query((returns) => Performance)
  async performance(@Args('id', { type: () => Int }) id: number) {
    return this.performanceService.performance({
      id,
    });
  }

  @Query((returns) => [Performance])
  async performances() {
    return this.performanceService.performances({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  @ResolveField()
  async performanceFileRelations(@Parent() performance: Performance) {
    return this.performanceFileRelationService.performanceFileRelations({
      where: {
        performanceId: performance.id,
      },
    });
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Performance)
  async createPerformance(
    @Args('createPerformanceInput')
    createPerformanceInput: CreatePerformanceInput,
  ) {
    const { title, content, timestamp, files } = createPerformanceInput;
    const fileList = await Promise.all(files);

    // 1. 파일이 있으면 파일 업로드 및 db 저장
    const createdFiles = await this.fileService.createFiles({
      KeyPrefix: `performances/${title}`,
      files: fileList,
    });

    // 2. quilljs delta content 변환
    const convertedCreatePerformanceInput =
      await this.performanceService.convertContent({
        title,
        content,
      });

    const currentTime = this.dayjsService.getCurrentTime();
    const convertedTimeStamp = this.dayjsService.convertGMT(
      timestamp.toUTCString(),
    );

    const idOfCreatedFiles = createdFiles.map(({ id }) => ({ fileId: id }));

    // 3. 활동실적 및 이력 생성
    return this.performanceService.createPerformance({
      ...convertedCreatePerformanceInput,
      timestamp: convertedTimeStamp,
      performanceFileRelations: {
        createMany: {
          data: idOfCreatedFiles,
        },
      },
      performanceHistories: {
        create: {
          ...convertedCreatePerformanceInput,
          timestamp: convertedTimeStamp,
          from: currentTime,
        },
      },
    });
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Performance)
  async updatePerformance(
    @Args('updatePerformanceInput')
    updatePerformanceInput: UpdatePerformanceInput,
  ) {
    const { id, title, content, timestamp, files, deletedFiles } =
      updatePerformanceInput;

    // 1. files args로 들어온 것은 새로 추가된 파일이므로 s3에 업로드
    const fileList = await Promise.all(files);
    const createdFiles = await this.fileService.createFiles({
      KeyPrefix: `performances/${title}`,
      files: fileList,
    });

    // 2. 삭제된 파일 제거 처리
    await this.fileService.deleteFiles(deletedFiles);

    // 3. quilljs delta content 변환
    const convertedUpdatePerformanceInput =
      await this.performanceService.convertContent({
        title,
        content,
      });

    const lastPerformanceHistory =
      await this.performanceService.performanceHistory({
        performanceId: id,
        to: null,
      });

    const {
      id: lastPerformanceHistoryId,
      performanceId,
      ...dataForNewPerformanceHistory
    } = lastPerformanceHistory;

    await this.performanceService.compareContent({
      prevContent: lastPerformanceHistory.content,
      nextContent: convertedUpdatePerformanceInput.content,
    });

    const currentTime = this.dayjsService.getCurrentTime();
    const convertedTimeStamp = this.dayjsService.convertGMT(
      timestamp.toUTCString(),
    );

    const idOfCreatedFiles = createdFiles.map(({ id }) => ({ fileId: id }));

    if (
      lastPerformanceHistory.title !== title ||
      lastPerformanceHistory.content !==
        convertedUpdatePerformanceInput.content ||
      lastPerformanceHistory.timestamp !== timestamp ||
      files.length ||
      deletedFiles.length
    ) {
      return this.performanceService.updatePerformance({
        where: {
          id,
        },
        data: {
          ...convertedUpdatePerformanceInput,
          timestamp: convertedTimeStamp,
          performanceFileRelations: {
            createMany: {
              data: idOfCreatedFiles,
            },
          },
          performanceHistories: {
            update: {
              where: {
                id: lastPerformanceHistoryId,
              },
              data: {
                to: currentTime,
              },
            },
            create: {
              ...dataForNewPerformanceHistory,
              ...convertedUpdatePerformanceInput,
              timestamp: convertedTimeStamp,
              from: currentTime,
            },
          },
        },
      });
    }
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Performance)
  async deletePerformance(@Args('id', { type: () => Int }) id: number) {
    const [_, deletedPeformance] =
      await this.performanceService.deletePerformance({
        id,
      });

    return deletedPeformance;
  }
}
