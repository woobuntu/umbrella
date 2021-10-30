import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CatalogOptionRelation } from 'src/graphql/types/catalog-option-relation';
import { OptionService } from 'src/services';

@Resolver((of) => CatalogOptionRelation)
export class CatalogOptionRelationResolver {
  constructor(private optionService: OptionService) {}

  @ResolveField()
  async option(@Parent() catalogOptionRelation: CatalogOptionRelation) {
    return this.optionService.option({
      id: catalogOptionRelation.optionId,
    });
  }
}
