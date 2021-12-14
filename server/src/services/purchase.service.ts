import { Injectable } from '@nestjs/common';

// rxjs
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

// prisma
import { Prisma, Purchase, Orderer, Delivery, Payment } from '.prisma/client';

// services
import { TossService } from './toss.service';
import { PrismaService } from './prisma.service';
import { SendgridService } from './sendgrid.service';
import { KakaoService } from './kakao.service';
import { DayjsService } from './dayjs.service';
import { ConfigService } from '@nestjs/config';

// utils
import { convertPrice } from 'src/utils';

// types
import { FindManyPurchaseParams } from 'src/types/purchase';
import { SendgridConfig } from 'src/types/config';

// graphql types
import { DeliveryWithOutId } from 'src/graphql/types/purchase/delivery-without-id.model';
import { OrdererWithOutId } from 'src/graphql/types/purchase/orderer-without-id.model';
import { PurchaseResult } from 'src/graphql/types/purchase';
import { BasketService } from './basket.service';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private basketService: BasketService,
    private tossService: TossService,
    private kakaoService: KakaoService,
    private sendgridService: SendgridService,
    private dayjsService: DayjsService,
    private configService: ConfigService,
  ) {}

  purchases(params: FindManyPurchaseParams): Promise<Purchase[]> {
    return this.prisma.purchase.findMany(params);
  }

  createOrdererAndDeliveryAndPayment(params: {
    orderer: OrdererWithOutId;
    delivery: DeliveryWithOutId;
    payment: Prisma.PaymentCreateInput;
    deliveryFee: number;
  }): Observable<[Orderer, Delivery, Payment]> {
    const { orderer, delivery, payment, deliveryFee } = params;
    const currentTime = this.dayjsService.getCurrentTime();

    const createOrderer = this.prisma.orderer.create({
      data: {
        ...orderer,
        ordererHistories: {
          create: {
            ...orderer,
            from: currentTime,
          },
        },
      },
    });

    const createDelivery = this.prisma.delivery.create({
      data: {
        ...delivery,
        orderStatus: '결제완료', // 가상계좌는 웹훅에서 처리
        deliveryHistories: {
          create: {
            ...delivery,
            from: currentTime,
            orderStatus: '결제완료',
          },
        },
      },
    });

    const createPayment = this.prisma.payment.create({
      data: {
        ...payment,
        deliveryFee,
        paymentHistories: {
          create: {
            ...payment,
            deliveryFee,
            from: currentTime,
          },
        },
      },
    });
    return from(
      this.prisma.$transaction([createOrderer, createDelivery, createPayment]),
    );
  }

  createPurchasesAndHistoriesAndDeleteBaskets(params: {
    ordererCreated: Orderer;
    deliveryCreated: Delivery;
    paymentCreated: Payment;
    baskets: any[];
  }) {
    const { ordererCreated, deliveryCreated, paymentCreated, baskets } = params;
    const { id: ordererId } = ordererCreated;
    const { id: deliveryId } = deliveryCreated;
    const { id: paymentId } = paymentCreated;

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

    const currentTime = this.dayjsService.getCurrentTime();

    const createPurchasesAndHistories = purchasesData.map((data) =>
      this.prisma.purchase.create({
        data: {
          ...data,
          purchaseHistories: {
            create: {
              ...data,
              from: currentTime,
            },
          },
        },
      }),
    );

    const deleteBaskets = this.prisma.basket.deleteMany({
      where: {
        userId: {
          in: baskets.map(({ userId }) => userId),
        },
      },
    });

    return from(
      this.prisma.$transaction([...createPurchasesAndHistories, deleteBaskets]),
    );
  }

  alarmPurchase(params: {
    baskets: any[];
    ordererCreated: Orderer;
    deliveryCreated: Delivery;
    paymentCreated: Payment;
  }) {
    const { baskets, ordererCreated, deliveryCreated, paymentCreated } = params;
    const purchaseList = baskets
      .map(({ amount, catalogOptionRelation: { catalog, option } }) => {
        const price = (catalog.price + option.price) * amount;
        return `<p>${catalog.name}(${option.name}) ${amount}개 = ${convertPrice(
          price,
        )}원</p>`;
      })
      .join('');

    const { addressee } = this.configService.get<SendgridConfig>('sendgrid');

    const msg = {
      to: addressee,
      from: 'withus1030@naver.com',
      subject: '구매주문',
      html: `<div>
                <h3>주문자정보</h3>
                <p>주문자 이름 : ${ordererCreated.name}</p>
                <p>주문자 이메일 : ${ordererCreated.email}</p>
                <p>주문자 전화번호 : ${ordererCreated.phone}</p>
                <br />
                <h3>배송정보</h3>
                <p>수취인 이름 : ${deliveryCreated.name}</p>
                <p>수취인 전화번호 : ${deliveryCreated.phone}</p>
                <p>수취인 주소 : ${deliveryCreated.address}</p>
                <p>배송요청사항 : ${deliveryCreated.memo}</p>
                <br />
                <h3>주문목록</h3>
                ${purchaseList}
                <p>총 상품금액 : ${convertPrice(
                  paymentCreated.amount - paymentCreated.deliveryFee,
                )}원</p>
                <p>배송비 : ${convertPrice(paymentCreated.deliveryFee)}원</p>
                <p>총 결제금액 : ${convertPrice(paymentCreated.amount)}원</p>
              </div>`,
    };
    return from(this.sendgridService.sendMail(msg));
  }

  createPurchase(params: {
    orderer: OrdererWithOutId;
    delivery: DeliveryWithOutId;
    payment: Prisma.PaymentCreateInput;
    baskets: any[];
    deliveryFee: number;
  }): Observable<PurchaseResult> {
    const { orderer, delivery, payment, baskets, deliveryFee } = params;

    return this.createOrdererAndDeliveryAndPayment({
      orderer,
      delivery,
      payment,
      deliveryFee,
    }).pipe(
      concatMap(([ordererCreated, deliveryCreated, paymentCreated]) =>
        forkJoin([
          of({ ordererCreated, deliveryCreated, paymentCreated }),
          this.createPurchasesAndHistoriesAndDeleteBaskets({
            ordererCreated,
            deliveryCreated,
            paymentCreated,
            baskets,
          }),
        ]),
      ),
      concatMap(([{ ordererCreated, deliveryCreated, paymentCreated }]) =>
        forkJoin([
          of({
            orderer: ordererCreated,
            delivery: deliveryCreated,
            payment: paymentCreated,
          }),
          this.alarmPurchase({
            ordererCreated,
            deliveryCreated,
            paymentCreated,
            baskets,
          }),
        ]),
      ),
      map(([purchaseResult]) => purchaseResult),
    );
  }

  createPurchaseByTossPayments(params: {
    orderer: OrdererWithOutId;
    delivery: DeliveryWithOutId;
    payment: Prisma.PaymentCreateInput;
    baskets: any[];
    deliveryFee: number;
  }): Observable<PurchaseResult> {
    const {
      payment: { paymentKey, orderId, amount },
    } = params;

    return this.tossService
      .approvePayment({
        paymentKey,
        orderId,
        amount,
      })
      .pipe(concatMap(() => this.createPurchase(params)));
  }

  createPurchaseByKakaoPay(params: {
    apporvePayloads: {
      accessToken: string;
      tid: string;
      partnerOrderId: string;
      partnerUserId: string;
      pgToken: string;
    };
    orderer: OrdererWithOutId;
    delivery: DeliveryWithOutId;
  }): Observable<PurchaseResult> {
    const { apporvePayloads, orderer, delivery } = params;

    return from(
      this.basketService.baskets({
        where: {
          userId: apporvePayloads.partnerUserId,
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
    ).pipe(
      concatMap((baskets: any[]) => {
        const basketTotalPrice = baskets.reduce(
          (sum, { amount, catalogOptionRelation: { catalog, option } }) =>
            sum + amount * (catalog.price + option.price),
          0,
        );

        const deliveryFee = basketTotalPrice > 30000 ? 0 : 3000;

        const payment = {
          platform: '카카오',
          tid: apporvePayloads.tid,
          amount: basketTotalPrice + deliveryFee,
        };

        return this.kakaoService.approvePayment(apporvePayloads).pipe(
          concatMap(() =>
            this.createPurchase({
              orderer,
              delivery,
              payment,
              baskets,
              deliveryFee,
            }),
          ),
        );
      }),
    );
  }
}
