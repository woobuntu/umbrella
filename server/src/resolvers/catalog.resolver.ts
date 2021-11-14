import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Catalog, FilterCatalogsInput } from 'src/graphql/types/catalog';
import {
  CatalogFileRelationService,
  CatalogOptionRelationService,
  CatalogService,
} from 'src/services';

@Resolver((of) => Catalog)
export class CatalogResolver {
  constructor(
    private catalogService: CatalogService,
    private catalogFileRelationService: CatalogFileRelationService,
    private catalogOptionRelationService: CatalogOptionRelationService,
  ) {}

  @Query((returns) => Catalog)
  async catalog(@Args('id', { type: () => Int }) id: number) {
    return this.catalogService.catalog({
      id,
    });
  }

  @Query((returns) => [Catalog])
  async catalogs(
    @Args('filterCatalogsInput', { nullable: true })
    filterCatalogsInput: FilterCatalogsInput,
  ) {
    let payload;
    if (filterCatalogsInput) {
      const { ids } = filterCatalogsInput;
      payload = {
        where: {
          id: {
            in: ids,
          },
        },
      };
    } else {
      payload = {};
    }
    return this.catalogService.catalogs(payload);
  }

  @ResolveField()
  async catalogFileRelations(@Parent() catalog: Catalog) {
    return this.catalogFileRelationService.catalogFileRelations({
      where: {
        catalogId: catalog.id,
      },
    });
  }

  @ResolveField()
  async catalogOptionRelations(@Parent() catalog: Catalog) {
    return this.catalogOptionRelationService.catalogOptionRelations({
      where: {
        catalogId: catalog.id,
      },
    });
  }
}
