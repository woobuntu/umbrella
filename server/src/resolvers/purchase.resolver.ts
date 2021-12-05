import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators';
import {
  CreatePurchaseInput,
  Purchase,
  PurchaseResult,
} from 'src/graphql/types/purchase';
import { User } from 'src/graphql/types/user';
import { AuthGuard, PurchaseGuard } from 'src/guards';
import {
  CatalogOptionRelationService,
  DeliveryService,
  OrdererService,
  PaymentService,
  PurchaseService,
} from 'src/services';

@Resolver((of) => Purchase)
export class PurchaseResolver {
  constructor(
    private purchaseService: PurchaseService,
    private ordererService: OrdererService,
    private deliveryService: DeliveryService,
    private paymentService: PaymentService,
    private catalogOptionRelationService: CatalogOptionRelationService,
  ) {}

  @UseGuards(AuthGuard)
  @Query((returns) => [Purchase])
  async purchases(@CurrentUser() user: User) {
    return this.purchaseService.purchases({
      where: {
        userId: user.id,
      },
      include: {
        purchaseHistories: true,
      },
    });
  }

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

  @ResolveField()
  async catalogOptionRelation(@Parent() purchase: Purchase) {
    return this.catalogOptionRelationService.catalogOptionRelation({
      id: purchase.catalogOptionRelationId,
    });
  }

  @ResolveField()
  async delivery(@Parent() purchase: Purchase) {
    return this.deliveryService.delivery({
      id: purchase.deliveryId,
    });
  }

  @ResolveField()
  async payment(@Parent() purchase: Purchase) {
    return this.paymentService.payment({
      id: purchase.paymentId,
    });
  }
}
