import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MetaFileRelation } from 'src/graphql/types/meta-file-relation';
import { FileService, MetaFileRelationService } from 'src/services';

@Resolver((of) => MetaFileRelation)
export class MetaFileRelationResolver {
  constructor(
    private metaFileRelationService: MetaFileRelationService,
    private fileService: FileService,
  ) {}

  @Query((returns) => [MetaFileRelation])
  async metaFileRelations(@Args('type') type: string) {
    return this.metaFileRelationService.metaFileRelations({
      where: {
        type,
      },
    });
  }

  @ResolveField()
  async file(@Parent() metaFileRelation: MetaFileRelation) {
    return this.fileService.file({
      id: metaFileRelation.fileId,
    });
  }
}
