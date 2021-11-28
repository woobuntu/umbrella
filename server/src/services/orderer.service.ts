import { Orderer, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrdererService {
  constructor(private prisma: PrismaService) {}

  async createOrderer(data: Prisma.OrdererCreateInput): Promise<Orderer> {
    return this.prisma.orderer.create({
      data: {
        ...data,
        ordererHistories: {
          create: data,
        },
      },
    });
  }
}
