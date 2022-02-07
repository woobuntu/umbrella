import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PerformanceFileRelation } from 'src/graphql/types/performance-file-relation';
import { FileService } from 'src/services';

@Resolver((of) => PerformanceFileRelation)
export class PerformanceFileRelationResolver {
  constructor(private fileService: FileService) {}

  @ResolveField()
  async file(@Parent() performanceFileRelation: PerformanceFileRelation) {
    return this.fileService.file({
      id: performanceFileRelation.fileId,
    });
  }
}
