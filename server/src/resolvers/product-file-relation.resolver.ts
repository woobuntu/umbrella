import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductFileRelation } from 'src/graphql/types/product-file-relation';
import { FileService } from 'src/services';

@Resolver((of) => ProductFileRelation)
export class ProductFileRelationResolver {
  constructor(private fileService: FileService) {}

  @ResolveField()
  async file(@Parent() productFileRelation: ProductFileRelation) {
    return this.fileService.file({
      id: productFileRelation.fileId,
    });
  }
}
