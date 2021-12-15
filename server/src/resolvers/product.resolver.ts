import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product, FilterProductsInput } from 'src/graphql/types/product';
import {
  ProductFileRelationService,
  ProductOptionRelationService,
  ProductService,
} from 'src/services';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private productFileRelationService: ProductFileRelationService,
    private productOptionRelationService: ProductOptionRelationService,
  ) {}

  @Query((returns) => Product)
  async product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.product({
      id,
    });
  }

  @Query((returns) => [Product])
  async products(
    @Args('filterProductsInput', { nullable: true })
    filterProductsInput: FilterProductsInput,
  ) {
    let payload;
    if (filterProductsInput) {
      const { ids } = filterProductsInput;
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
    return this.productService.products(payload);
  }

  @ResolveField()
  async productFileRelations(@Parent() product: Product) {
    return this.productFileRelationService.productFileRelations({
      where: {
        productId: product.id,
      },
    });
  }

  @ResolveField()
  async productOptionRelations(@Parent() product: Product) {
    return this.productOptionRelationService.productOptionRelations({
      where: {
        productId: product.id,
      },
    });
  }
}
