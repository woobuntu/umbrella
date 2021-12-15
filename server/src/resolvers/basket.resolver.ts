import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
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
import { BasketService, ProductOptionRelationService } from 'src/services';

@Resolver((of) => Basket)
export class BasketResolver {
  constructor(
    private basketService: BasketService,
    private productOptionRelationService: ProductOptionRelationService,
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
    const { productOptionRelationId, quantity } = upsertBasketInput;

    const basket = await this.basketService.basket({
      userId: user.id,
      productOptionRelationId,
    });

    return basket
      ? this.basketService.updateBasket({
          where: {
            id: basket.id,
          },
          data: {
            quantity,
          },
        })
      : this.basketService.createBasket({
          userId: user.id,
          ...upsertBasketInput,
        });
  }

  @Mutation((returns) => Basket)
  @UseGuards(AuthGuard)
  async deleteBasket(@Args('id', { type: () => Int }) id: number) {
    return this.basketService.deleteBasket({
      id,
    });
  }

  @ResolveField()
  async productOptionRelation(@Parent() basket: Basket) {
    return this.productOptionRelationService.productOptionRelation({
      id: basket.productOptionRelationId,
    });
  }
}
