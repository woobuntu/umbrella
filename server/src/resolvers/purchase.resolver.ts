import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Purchase } from 'src/graphql/types/purchase';
import { ProductOptionRelationService } from 'src/services';

@Resolver((of) => Purchase)
export class PurchaseResolver {
  constructor(
    private productOptionRelationService: ProductOptionRelationService,
  ) {}

  @ResolveField()
  async productOptionRelation(@Parent() purchase: Purchase) {
    return this.productOptionRelationService.productOptionRelation({
      id: purchase.productOptionRelationId,
    });
  }
}
