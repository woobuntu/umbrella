import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CatalogFileRelation } from 'src/graphql/types/catalog-file-relation';
import { FileService } from 'src/services';

@Resolver((of) => CatalogFileRelation)
export class CatalogFileRelationResolver {
  constructor(private fileService: FileService) {}

  @ResolveField()
  async file(@Parent() catalogFileRelation: CatalogFileRelation) {
    return this.fileService.file({
      id: catalogFileRelation.fileId,
    });
  }
}
