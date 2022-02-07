import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrdererService {
  constructor(private prisma: PrismaService) {}

  async orderer(ordererWhereUniqueInput: Prisma.OrdererWhereUniqueInput) {
    return this.prisma.orderer.findUnique({
      where: ordererWhereUniqueInput,
    });
  }
}
