import { Orderer, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { DayjsService } from './dayjs.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrdererService {
  constructor(
    private prisma: PrismaService,
    private dayjsService: DayjsService,
  ) {}

  async createOrderer(data: Prisma.OrdererCreateInput): Promise<Orderer> {
    return this.prisma.orderer.create({
      data: {
        ...data,
        ordererHistories: {
          create: {
            ...data,
            from: this.dayjsService.getCurrentTime(),
          },
        },
      },
    });
  }
}
