import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateDefaultDeliveryInput } from 'src/graphql/types/default-delivery';
import { DayjsService } from '.';
import { PrismaService } from './prisma.service';

@Injectable()
export class DefaultDeliveryService {
  constructor(
    private prisma: PrismaService,
    private dayjsSerivce: DayjsService,
  ) {}

  async defaultDelivery(userId: string) {
    return this.prisma.defaultDelivery.findUnique({
      where: {
        userId,
      },
    });
  }

  async updateDefaultDelivery(params: {
    where: Prisma.DefaultDeliveryWhereUniqueInput;
    data: UpdateDefaultDeliveryInput;
  }) {
    const { where, data } = params;
    const {
      id: lastDefaultDeliveryHistoryId,
      defaultDeliveryId,
      ...dataForNewDefaultDeliveryHistory
    } = await this.prisma.defaultDeliveryHistory.findFirst({
      where: {
        userId: where.userId,
        to: null,
      },
    });

    const currentTime = this.dayjsSerivce.getCurrentTime();

    return this.prisma.defaultDelivery.update({
      where: {
        userId: where.userId,
      },
      data: {
        ...data,
        defaultDeliveryHistories: {
          update: {
            where: {
              id: lastDefaultDeliveryHistoryId,
            },
            data: {
              to: currentTime,
            },
          },
          create: {
            ...dataForNewDefaultDeliveryHistory,
            ...data,
            from: currentTime,
          },
        },
      },
    });
  }
}
