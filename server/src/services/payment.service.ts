import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  FindManyPaymentHistoryParams,
  FindManyPaymentParams,
} from 'src/types/payment';
import { PrismaService } from './prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

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

  async createPayment(params: {
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

    const [payment, _] = await this.prisma.$transaction([
      createPaymentAndOrdererAndDeliveryAndPurchases,
      deleteBaskets,
    ]);

    return payment;
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
