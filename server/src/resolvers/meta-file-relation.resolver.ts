import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MetaFileRelation } from 'src/graphql/types/meta-file-relation';
import { FileService } from 'src/services';

@Resolver((of) => MetaFileRelation)
export class MetaFileRelationResolver {
  constructor(private fileService: FileService) {}

  @ResolveField()
  async file(@Parent() metaFileRelation: MetaFileRelation) {
    return this.fileService.file({
      id: metaFileRelation.fileId,
    });
  }
}
