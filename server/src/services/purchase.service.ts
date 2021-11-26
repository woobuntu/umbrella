import { Injectable } from '@nestjs/common';
import {
  CreatePurchaseInput,
  PurchaseResult,
} from 'src/graphql/types/purchase';
import { User } from 'src/graphql/types/user';
import { TossService } from './toss.service';
import { BasketService } from './basket.service';
import { PrismaService } from './prisma.service';
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  map,
  Observable,
  of,
} from 'rxjs';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private basketService: BasketService,
    private tossService: TossService,
  ) {}

  createPurchase(params: {
    user: User;
    data: CreatePurchaseInput;
  }): Observable<PurchaseResult> {
    // 1. orderer 생성
    // 2. delivery 생성
    // 3. payment 생성
    // 4. 1개 이상의 purchase와 그 이력을 생성하면서 각각 orderer, delivery, payment에 connect
    // 이걸 한 트랜잭션 안에서 해결할 방법?
    const { user, data } = params;
    const { orderer, delivery, payment } = data;

    const { paymentKey, orderId, amount } = payment;

    // 1. 토스 서버로 결제 승인 요청
    return this.tossService
      .approvePayment({
        paymentKey,
        orderId,
        amount,
      })
      .pipe(
        // 2. 사용자의 장바구니 목록 불러오기
        concatMap(() =>
          from(
            this.basketService.baskets({
              where: {
                userId: user.id,
              },
              include: {
                catalogOptionRelation: true,
              },
            }),
          ),
        ),
        // 3. orderer, delivery, payment 저장
        concatMap((baskets) => {
          const createOrderer = this.prisma.orderer.create({
            data: {
              ...orderer,
              ordererHistories: {
                create: orderer,
              },
            },
          });

          const createDelivery = this.prisma.delivery.create({
            data: {
              ...delivery,
              deliveryHistories: {
                create: delivery,
              },
            },
          });

          const createPayment = this.prisma.payment.create({
            data: {
              ...payment,
              paymentHistories: {
                create: payment,
              },
            },
          });

          return forkJoin([
            of(baskets),
            from(
              this.prisma.$transaction([
                createOrderer,
                createDelivery,
                createPayment,
              ]),
            ),
          ]);
        }),
        // 4. purchase 및 이력 생성 + 장바구니 비우기
        concatMap(
          ([
            baskets,
            [{ id: ordererId }, { id: deliveryId }, { id: paymentId }],
          ]) => {
            const purchasesData = baskets.map(
              ({ userId, catalogOptionRelationId, amount }) => ({
                userId,
                catalogOptionRelationId,
                ordererId,
                deliveryId,
                paymentId,
                amount,
              }),
            );
            const createPurchases = this.prisma.purchase.createMany({
              data: purchasesData,
            });

            const createPurchasesHistories =
              this.prisma.purchaseHistory.createMany({
                data: purchasesData,
              });

            const deleteBaskets = this.prisma.basket.deleteMany({
              where: {
                userId: {
                  in: baskets.map(({ userId }) => userId),
                },
              },
            });

            return from(
              this.prisma.$transaction([
                createPurchases,
                createPurchasesHistories,
                deleteBaskets,
              ]),
            );
          },
        ),
        map(() => ({ state: 'success', redirectUrl: '/success' })),
        catchError((error) => {
          console.log(error);
          return of({ state: 'fail', redirectUrl: '/fail' });
        }),
      );
  }
}
