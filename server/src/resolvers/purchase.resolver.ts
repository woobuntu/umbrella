import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators';
import {
  CreatePurchaseInput,
  Purchase,
  PurchaseResult,
} from 'src/graphql/types/purchase';
import { User } from 'src/graphql/types/user';
import { PurchaseGuard } from 'src/guards';
import { PurchaseService } from 'src/services';

@Resolver((of) => Purchase)
export class PurchaseResolver {
  constructor(private purchaseService: PurchaseService) {}

  @UseGuards(PurchaseGuard)
  @Mutation((returns) => PurchaseResult)
  async createPurchase(
    @Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput,
    @CurrentUser() user: User,
  ) {
    return this.purchaseService.createPurchase({
      user,
      data: createPurchaseInput,
    });
  }
}
