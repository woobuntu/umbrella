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
import { SendgridService } from './sendgrid.service';
import { convertPrice } from 'src/utils';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private basketService: BasketService,
    private tossService: TossService,
    private sendgridService: SendgridService,
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
                catalogOptionRelation: {
                  include: {
                    catalog: true,
                    option: true,
                  },
                },
              },
            }),
          ),
        ),
        // 3. orderer, delivery, payment 저장
        concatMap((baskets: any[]) => {
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
        concatMap(([baskets, [orderer, delivery, payment]]) => {
          const { id: ordererId } = orderer;
          const { id: deliveryId } = delivery;
          const { id: paymentId } = payment;

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

          return forkJoin([
            of({ orderer, delivery, payment, baskets }),
            from(
              this.prisma.$transaction([
                createPurchases,
                createPurchasesHistories,
                deleteBaskets,
              ]),
            ),
          ]);
        }),
        concatMap(([{ orderer, delivery, payment, baskets }]) => {
          const purchaseList = baskets
            .map(({ amount, catalogOptionRelation: { catalog, option } }) => {
              const price = (catalog.price + option.price) * amount;
              return `<p>${catalog.name}(${
                option.name
              }) ${amount}개 = ${convertPrice(price)}원</p>`;
            })
            .join('');

          const exactAmount = baskets.reduce(
            (sum, { amount, catalogOptionRelation: { catalog, option } }) =>
              sum + amount * (catalog.price + option.price),
            0,
          );

          const deliveryFee = exactAmount > 30000 ? 0 : 3000;

          const msg = {
            to: 'withus1030@naver.com',
            from: 'withus1030@naver.com',
            subject: '구매주문',
            html: `<div>
                    <h3>주문자정보</h3>
                    <p>주문자 이름 : ${orderer.name}</p>
                    <p>주문자 이메일 : ${orderer.email}</p>
                    <p>주문자 전화번호 : ${orderer.phone}</p>
                    <br />
                    <h3>배송정보</h3>
                    <p>수취인 이름 : ${delivery.name}</p>
                    <p>수취인 전화번호 : ${delivery.phone}</p>
                    <p>수취인 주소 : ${delivery.address}</p>
                    <p>배송요청사항 : ${delivery.memo}</p>
                    <br />
                    <h3>주문목록</h3>
                    ${purchaseList}
                    <p>총 상품금액 : ${convertPrice(exactAmount)}원</p>
                    <p>배송비 : ${convertPrice(deliveryFee)}원</p>
                    <p>총 결제금액 : ${convertPrice(payment.amount)}원</p>
                  </div>`,
          };
          return from(this.sendgridService.sendMail(msg));
        }),
        map(() => ({ state: 'success', redirectUrl: '/success' })),
        catchError((error) => {
          console.log(error);
          return of({ state: 'fail', redirectUrl: '/fail' });
        }),
      );
  }
}
