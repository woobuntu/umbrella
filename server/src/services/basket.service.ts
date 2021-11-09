import { Basket } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateBasket, FindManyBasketParams } from 'src/types/basket';
import { PrismaService } from './prisma.service';

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  async baskets(params: FindManyBasketParams): Promise<Basket[]> {
    return this.prisma.basket.findMany(params);
  }

  async createBasket(data: CreateBasket): Promise<Basket> {
    return this.prisma.basket.create({
      data: {
        ...data,
        basketHistories: {
          create: [data],
        },
      },
    });
  }
}
