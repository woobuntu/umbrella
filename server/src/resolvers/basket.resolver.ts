import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators';
import { Basket, UpsertBasketInput } from 'src/graphql/types/basket';
import { User } from 'src/graphql/types/user';
import { AuthGuard } from 'src/guards';
import { BasketService, CatalogOptionRelationService } from 'src/services';

@Resolver((of) => Basket)
export class BasketResolver {
  constructor(
    private basketService: BasketService,
    private catalogOptionRelationService: CatalogOptionRelationService,
  ) {}

  @Query((returns) => [Basket])
  @UseGuards(AuthGuard)
  async baskets(@CurrentUser() user: User) {
    return this.basketService.baskets({
      where: {
        userId: user.id,
      },
    });
  }

  @Mutation((returns) => Basket)
  @UseGuards(AuthGuard)
  async upsertBasket(
    @Args('upsertBasketInput') upsertBasketInput: UpsertBasketInput,
    @CurrentUser() user: User,
  ) {
    const { catalogOptionRelationId, amount } = upsertBasketInput;

    const basket = await this.basketService.basket({
      userId: user.id,
      catalogOptionRelationId,
    });

    return basket
      ? this.basketService.updateBasket({
          where: {
            id: basket.id,
          },
          data: {
            amount,
          },
        })
      : this.basketService.createBasket({
          userId: user.id,
          ...upsertBasketInput,
        });
  }

  @ResolveField()
  async catalogOptionRelation(@Parent() basket: Basket) {
    return this.catalogOptionRelationService.catalogOptionRelation({
      id: basket.catalogOptionRelationId,
    });
  }
}
