import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CatalogOptionRelation } from 'src/graphql/types/catalog-option-relation';
import { CatalogService, OptionService } from 'src/services';

@Resolver((of) => CatalogOptionRelation)
export class CatalogOptionRelationResolver {
  constructor(
    private catalogService: CatalogService,
    private optionService: OptionService,
  ) {}

  @ResolveField()
  async catalog(@Parent() catalogOptionRelation: CatalogOptionRelation) {
    return this.catalogService.catalog({
      id: catalogOptionRelation.catalogId,
    });
  }

  @ResolveField()
  async option(@Parent() catalogOptionRelation: CatalogOptionRelation) {
    return this.optionService.option({
      id: catalogOptionRelation.optionId,
    });
  }
}
