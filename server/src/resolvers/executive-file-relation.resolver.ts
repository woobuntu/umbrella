import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExecutiveFileRelation } from 'src/graphql/types/executive-file-relation';
import { FileService } from 'src/services';

@Resolver((of) => ExecutiveFileRelation)
export class ExecutiveFileRelationResolver {
  constructor(private fileService: FileService) {}

  @ResolveField()
  async file(@Parent() executiveFileRelation: ExecutiveFileRelation) {
    return this.fileService.file({
      id: executiveFileRelation.fileId,
    });
  }
}
