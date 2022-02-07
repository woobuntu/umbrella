import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { concatMap, forkJoin, from, map, of } from 'rxjs';
import {
  FindManyPaymentHistoryParams,
  FindManyPaymentParams,
} from 'src/types/payment';
import { SendgridService } from './sendgrid.service';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { SendgridConfig } from 'src/types/config';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  async payment(paymentWhereUniqueInput: Prisma.PaymentWhereUniqueInput) {
    return this.prisma.payment.findUnique({
      where: paymentWhereUniqueInput,
    });
  }

  async payments(params: FindManyPaymentParams) {
    return this.prisma.payment.findMany(params);
  }

  async paymentHistories(params: FindManyPaymentHistoryParams) {
    return this.prisma.paymentHistory.findMany(params);
  }

  createPayment(params: {
    data: Prisma.PaymentCreateInput;
    basketIds: number[];
  }) {
    const { data, basketIds } = params;
    const createPaymentAndOrdererAndDeliveryAndPurchases =
      this.prisma.payment.create({
        data,
      });

    const deleteBaskets = this.prisma.basket.deleteMany({
      where: {
        id: {
          in: basketIds,
        },
      },
    });

    return from(
      this.prisma.$transaction([
        createPaymentAndOrdererAndDeliveryAndPurchases,
        deleteBaskets,
      ]),
    ).pipe(
      concatMap(([payment, _]) =>
        forkJoin([
          of(payment),
          from(
            this.prisma.purchase.findMany({
              where: {
                paymentId: payment.id,
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
          from(
            this.prisma.orderer.findUnique({
              where: {
                paymentId: payment.id,
              },
            }),
          ),
          from(
            this.prisma.delivery.findUnique({
              where: {
                paymentId: payment.id,
              },
            }),
          ),
        ]),
      ),
      concatMap(([payment, purchases, orderer, delivery]) => {
        const purchaseList = purchases
          .map(({ productOptionRelation: { product, option }, quantity }) => {
            const price = (product.price + option.price) * quantity;
            return `<p>${product.name}(${option.name}) ${quantity}개 = ${price}원</p>`;
          })
          .join('');

        const { addressee } =
          this.configService.get<SendgridConfig>('sendgrid');
        const msg = {
          to: addressee,
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
                    <p>총 결제금액 : ${payment.amount}원</p>
                  </div>`,
        };
        return forkJoin([
          of(payment),
          from(this.sendgridService.sendMail(msg)),
        ]);
      }),
      map(([payment, _]) => payment),
    );
  }

  async updatePayment(params: {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.PaymentUpdateInput;
  }) {
    const { where, data } = params;

    return this.prisma.payment.update({
      where,
      data,
    });
  }
}
