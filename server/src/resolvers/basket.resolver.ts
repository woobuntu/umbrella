import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators';
import { Basket, CreateBasketInput } from 'src/graphql/types/basket';
import { User } from 'src/graphql/types/user';
import { BasketService } from 'src/services';

@Resolver((of) => Basket)
export class BasketResolver {
  constructor(private basketService: BasketService) {}

  @Mutation((returns) => [Basket])
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
}
