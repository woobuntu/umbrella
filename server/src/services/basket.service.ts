import { Basket } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateBasket } from 'src/types/basket';
import { PrismaService } from './prisma.service';

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  async createBasket(data: CreateBasket): Promise<Basket[]> {
    await this.prisma.basket.create({
      data: {
        ...data,
        basketHistories: {
          create: [data],
        },
      },
    });

    return this.prisma.basket.findMany({
      where: {
        userId: data.userId,
      },
    });
  }
}
