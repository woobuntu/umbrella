import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductOptionRelation } from 'src/graphql/types/product-option-relation';
import { ProductService, OptionService } from 'src/services';

@Resolver((of) => ProductOptionRelation)
export class ProductOptionRelationResolver {
  constructor(
    private productService: ProductService,
    private optionService: OptionService,
  ) {}

  @ResolveField()
  async product(@Parent() productOptionRelation: ProductOptionRelation) {
    return this.productService.product({
      id: productOptionRelation.productId,
    });
  }

  @ResolveField()
  async option(@Parent() productOptionRelation: ProductOptionRelation) {
    return this.optionService.option({
      id: productOptionRelation.optionId,
    });
  }
}
