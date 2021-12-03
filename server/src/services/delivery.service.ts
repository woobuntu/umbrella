import { Delivery, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateDeliveryInput } from 'src/graphql/types/delivery';
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
          create: {
            ...data,
            phone: data.phone ? data.phone : '010--',
          },
        },
      },
    });
  }

  async updateDelivery(params: {
    where: Prisma.DeliveryWhereUniqueInput;
    data: UpdateDeliveryInput;
  }): Promise<Delivery> {
    const { where, data } = params;

    const { id, deliveryId, ...prevDeliveryHistory } =
      await this.prisma.deliveryHistory.findFirst({
        where: {
          deliveryId: where.id,
          to: null,
        },
      });

    return this.prisma.delivery.update({
      where,
      data: {
        ...data,
        deliveryHistories: {
          update: {
            where: {
              id,
            },
            data: {
              to: new Date(),
            },
          },
          create: {
            ...prevDeliveryHistory,
            ...data,
          },
        },
      },
    });
  }
}
