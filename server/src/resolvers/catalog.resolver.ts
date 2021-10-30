import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Catalog } from 'src/graphql/types/catalog';
import { CatalogFileRelationService, CatalogService } from 'src/services';

@Resolver((of) => Catalog)
export class CatalogResolver {
  constructor(
    private catalogService: CatalogService,
    private catalogFileRelationService: CatalogFileRelationService,
  ) {}

  @Query((returns) => Catalog)
  async catalog(@Args('id', { type: () => Int }) id: number) {
    return this.catalogService.catalog({
      id,
    });
  }

  @Query((returns) => [Catalog])
  async catalogs() {
    return this.catalogService.catalogs();
  }

  @ResolveField()
  async catalogFileRelations(@Parent() catalog: Catalog) {
    return this.catalogFileRelationService.catalogFileRelations({
      where: {
        catalogId: catalog.id,
      },
    });
  }
}
