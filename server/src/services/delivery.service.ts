import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async delivery(deliveryWhereUniqueInput: Prisma.DeliveryWhereUniqueInput) {
    return this.prisma.delivery.findUnique({
      where: deliveryWhereUniqueInput,
    });
  }
}
