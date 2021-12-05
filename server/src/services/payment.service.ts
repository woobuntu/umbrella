import { Payment, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { DayjsService } from './dayjs.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private dayjsService: DayjsService,
  ) {}

  async createPayment(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({
      data: {
        ...data,
        paymentHistories: {
          create: {
            ...data,
            from: this.dayjsService.getCurrentTime(),
          },
        },
      },
    });
  }
}
