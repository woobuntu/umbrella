import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { concatMap, forkJoin, from } from 'rxjs';
import {
  BasketsAndDeliveryFee,
  CurrentUser,
  DeliveryInSession,
  OrdererInSession,
  TidAndPartnerOrderId,
} from 'src/decorators';
import {
  CreateDeliveryInput,
  DeliveryWithOutPaymentId,
} from 'src/graphql/types/delivery';
import {
  CreateOrdererInput,
  OrdererWithOutPaymentId,
} from 'src/graphql/types/orderer';
import {
  KakaoPayPrepareResult,
  OrdererAndDelivery,
  Payment,
  TossPaymentsInput,
  UpdatePaymentInput,
} from 'src/graphql/types/payment';
import { User } from 'src/graphql/types/user';
import { AuthGuard, TossPaymentsGuard } from 'src/guards';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  ClearSessionExceptUserInfo,
  StoreOrdererAndDelivery,
  StoreTidAndPartnerOrderIdInSession,
} from 'src/interceptors';
import {
  BasketService,
  DeliveryService,
  KakaoService,
  OrdererService,
  PaymentService,
  PurchaseService,
  TossService,
} from 'src/services';

@Resolver((of) => Payment)
export class PaymentResolver {
  constructor(
    private basketService: BasketService,
    private paymentService: PaymentService,
    private ordererService: OrdererService,
    private deliveryService: DeliveryService,
    private purchaseService: PurchaseService,
    private tossService: TossService,
    private kakaoService: KakaoService,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(StoreOrdererAndDelivery)
  @Mutation((returns) => OrdererAndDelivery)
  storeOrdererAndDelivery(
    @Args('createOrdererInput') createOrdererInput: CreateOrdererInput,
    @Args('createDeliveryInput') createDeliveryInput: CreateDeliveryInput,
    @OrdererInSession() orderer: OrdererWithOutPaymentId,
    @DeliveryInSession() delivery: DeliveryWithOutPaymentId,
  ) {
    return {
      orderer,
      delivery,
    };
  }

  @UseGuards(TossPaymentsGuard)
  @UseInterceptors(ClearSessionExceptUserInfo)
  @Mutation((returns) => Payment)
  createPaymentByToss(
    @Args('tossPaymentsInput') tossPaymentsInput: TossPaymentsInput,
    @OrdererInSession() orderer: OrdererWithOutPaymentId,
    @DeliveryInSession() delivery: DeliveryWithOutPaymentId,
    @CurrentUser() user: User,
    @BasketsAndDeliveryFee() { baskets, deliveryFee },
  ) {
    const { paymentKey, amount, orderId } = tossPaymentsInput;

    const dataForPaymentAndHistory = {
      platform: '토스',
      deliveryFee,
      paymentKey,
      orderId,
      amount,
    };

    return this.tossService
      .approvePayment({
        paymentKey,
        amount,
        orderId,
      })
      .pipe(
        concatMap(({ method }) =>
          this.paymentService.createPayment({
            data: {
              ...dataForPaymentAndHistory,
              type: method,
              orderer: {
                create: orderer,
              },
              delivery: {
                create: delivery,
              },
              user: {
                connect: {
                  id: user.id,
                },
              },
              purchases: {
                createMany: {
                  data: baskets.map(
                    ({ productOptionRelationId, quantity }) => ({
                      productOptionRelationId,
                      quantity,
                    }),
                  ),
                },
              },
              paymentHistories: {
                create: {
                  ...dataForPaymentAndHistory,
                  type: method,
                  userId: user.id,
                },
              },
            },
            basketIds: baskets.map(({ id }) => id),
          }),
        ),
      );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(StoreTidAndPartnerOrderIdInSession)
  @Mutation((returns) => KakaoPayPrepareResult)
  async prepareKakaoPayment(@CurrentUser() user: User) {
    const params = await this.basketService.getBasketInfoForKakaoPay(user.id);

    // accessToken이 카카오 accessToken이기 때문에 카카오 계정으로 가입하지 않은 사람은
    // 카카오 로그인 처리가 필요...?
    return this.kakaoService.preparePayment({
      userId: user.id,
      ...params,
    });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClearSessionExceptUserInfo)
  @Mutation((returns) => Payment)
  createPaymentByKakao(
    @Args('pgToken') pgToken: string,
    @CurrentUser() user: User,
    @OrdererInSession() orderer: OrdererWithOutPaymentId,
    @DeliveryInSession() delivery: DeliveryWithOutPaymentId,
    @TidAndPartnerOrderId() { tid, partnerOrderId },
  ) {
    return forkJoin([
      from(
        this.basketService.baskets({
          where: {
            userId: user.id,
          },
          include: {
            productOptionRelation: {
              include: {
                product: true,
                option: true,
              },
            },
          },
        }),
      ),
      this.kakaoService.approvePayment({
        tid,
        partnerOrderId,
        partnerUserId: user.id,
        pgToken,
      }),
    ]).pipe(
      concatMap(
        ([baskets, { tid, paymentMethodType }]: [
          any[],
          { tid: string; paymentMethodType: '현금' | '카드' },
        ]) => {
          const basketTotalPrice = this.basketService.sumBasketsAmount(baskets);
          const deliveryFee =
            this.basketService.calculateDeliveryFee(basketTotalPrice);

          const dataForPaymentAndHistory = {
            platform: '카카오',
            type: paymentMethodType,
            deliveryFee,
            tid,
            orderStatus: '결제완료',
            amount: basketTotalPrice + deliveryFee,
          };

          return this.paymentService.createPayment({
            data: {
              ...dataForPaymentAndHistory,
              orderer: {
                create: orderer,
              },
              delivery: {
                create: delivery,
              },
              user: {
                connect: {
                  id: user.id,
                },
              },
              purchases: {
                createMany: {
                  data: baskets.map(
                    ({ productOptionRelationId, quantity }) => ({
                      productOptionRelationId,
                      quantity,
                    }),
                  ),
                },
              },
              paymentHistories: {
                create: {
                  ...dataForPaymentAndHistory,
                  userId: user.id,
                },
              },
            },
            basketIds: baskets.map(({ id }) => id),
          });
        },
      ),
    );
  }

  @UseGuards(AdminGuard)
  @Query((returns) => [Payment])
  async payments() {
    return this.paymentService.payments({});
  }

  @UseGuards(AdminGuard)
  @Mutation((returns) => Payment)
  async updateOrderStatus(
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    const { paymentId, orderStatus } = updatePaymentInput;

    return this.paymentService.updatePayment({
      where: {
        id: paymentId,
      },
      data: {
        orderStatus,
      },
    });
  }

  @ResolveField()
  async orderer(@Parent() payment: Payment) {
    return this.ordererService.orderer({
      paymentId: payment.id,
    });
  }

  @ResolveField()
  async delivery(@Parent() payment: Payment) {
    return this.deliveryService.delivery({
      paymentId: payment.id,
    });
  }

  @ResolveField()
  async purchases(@Parent() payment: Payment) {
    return this.purchaseService.purchases({
      where: {
        paymentId: payment.id,
      },
    });
  }

  @ResolveField()
  async paymentHistories(@Parent() payment: Payment) {
    return this.paymentService.paymentHistories({
      where: {
        paymentId: payment.id,
      },
    });
  }
}
