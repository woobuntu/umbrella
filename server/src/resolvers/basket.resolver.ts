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
import { Basket, CreateBasketInput } from 'src/graphql/types/basket';
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
  async createBasket(
    @Args('createBasketInput')
    createBasketInput: CreateBasketInput,
    @CurrentUser() user: User,
  ) {
    return this.basketService.createBasket({
      userId: user.id,
      ...createBasketInput,
    });
  }

  @ResolveField()
  async catalogOptionRelation(@Parent() basket: Basket) {
    return this.catalogOptionRelationService.catalogOptionRelation({
      id: basket.catalogOptionRelationId,
    });
  }
}
