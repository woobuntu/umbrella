import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import {
  BasketsAndDeliveryFee,
  CurrentOrderRelatedInfo,
  CurrentUser,
} from 'src/decorators';
import { KakaoPayInfo } from 'src/decorators/kakao-pay-info.decorator';
import { TossPaymentInput } from 'src/graphql/types/payment';
import {
  KakaoPayPrepareResult,
  OrderRelatedInfo,
  OrderRelatedInfoInput,
  Purchase,
  PurchaseResult,
} from 'src/graphql/types/purchase';
import { User } from 'src/graphql/types/user';
import { AuthGuard, PurchaseByTossGuard } from 'src/guards';
import {
  ClearSessionExceptUserInfo,
  StoreOrderRelatedInfoInSession,
} from 'src/interceptors';
import { StoreKakaoPayInfoInSession } from 'src/interceptors/store-kakao-pay-info-in-session.interceptor';
import {
  BasketService,
  CatalogOptionRelationService,
  DeliveryService,
  KakaoService,
  PaymentService,
  PurchaseService,
} from 'src/services';

@Resolver((of) => Purchase)
export class PurchaseResolver {
  constructor(
    private purchaseService: PurchaseService,
    private deliveryService: DeliveryService,
    private paymentService: PaymentService,
    private basketService: BasketService,
    private kakaoService: KakaoService,
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

  @UseInterceptors(StoreOrderRelatedInfoInSession)
  @UseGuards(AuthGuard)
  @Mutation((returns) => OrderRelatedInfo)
  async storeOrderRelatedInfoInSession(
    @Args('orderRelatedInfoInput') orderRelatedInfoInput: OrderRelatedInfoInput,
    @CurrentOrderRelatedInfo() currentOrderRelatedInfo: OrderRelatedInfo,
  ) {
    return currentOrderRelatedInfo;
  }

  @UseInterceptors(ClearSessionExceptUserInfo)
  @UseGuards(PurchaseByTossGuard)
  @Mutation((returns) => PurchaseResult)
  async createPurchaseByTossPayments(
    @Args('tossPaymentInput')
    tossPaymentInput: TossPaymentInput,
    @CurrentOrderRelatedInfo() { orderer, delivery }: OrderRelatedInfo,
    @BasketsAndDeliveryFee()
    basketsAndDeliveryFee: {
      baskets: any[];
      deliveryFee: number;
    },
  ) {
    const { baskets, deliveryFee } = basketsAndDeliveryFee;

    return this.purchaseService.createPurchaseByTossPayments({
      orderer,
      delivery,
      payment: {
        ...tossPaymentInput,
        platform: '토스',
      },
      baskets,
      deliveryFee,
    });
  }

  @UseInterceptors(ClearSessionExceptUserInfo)
  @UseGuards(AuthGuard)
  @Mutation((returns) => PurchaseResult)
  async createPurchaseByKakaoPay(
    @Args('pgToken') pgToken: string,
    @CurrentUser() user: User,
    @CurrentOrderRelatedInfo() { orderer, delivery }: OrderRelatedInfo,
    @KakaoPayInfo()
    kakaoPayInfo: {
      tid: string;
      partnerOrderId: string;
    },
  ) {
    const { tid, partnerOrderId } = kakaoPayInfo;

    return this.purchaseService.createPurchaseByKakaoPay({
      apporvePayloads: {
        accessToken: user.accessToken,
        tid,
        partnerOrderId,
        partnerUserId: user.id,
        pgToken,
      },
      orderer,
      delivery,
    });
  }

  @UseInterceptors(StoreKakaoPayInfoInSession)
  @UseGuards(AuthGuard)
  @Mutation((returns) => KakaoPayPrepareResult)
  async prepareKakaoPayment(@CurrentUser() user: User) {
    const params = await this.basketService.getBasketInfoForKakaoPay(user.id);

    return this.kakaoService.preparePayment({
      accessToken: user.accessToken,
      userId: user.id,
      ...params,
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
