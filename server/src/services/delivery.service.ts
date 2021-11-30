import { Delivery, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async delivery(
    deliveryWhereUniqueInput: Prisma.DeliveryWhereUniqueInput,
  ): Promise<Delivery | null> {
    return this.prisma.delivery.findUnique({
      where: deliveryWhereUniqueInput,
    });
  }

  async createDelivery(data: Prisma.DeliveryCreateInput): Promise<Delivery> {
    return this.prisma.delivery.create({
      data: {
        ...data,
        deliveryHistories: {
          create: data,
        },
      },
    });
  }
}
