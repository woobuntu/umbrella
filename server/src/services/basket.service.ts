import { Basket, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateBasket, FindManyBasketParams } from 'src/types/basket';
import { PrismaService } from './prisma.service';

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  async basket(basketWhereInput: {
    userId: string;
    catalogOptionRelationId: number;
  }): Promise<Basket | null> {
    return this.prisma.basket.findFirst({
      where: basketWhereInput,
    });
  }

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

  async updateBasket(params: {
    where: Prisma.BasketWhereUniqueInput;
    data: {
      amount: number;
    };
  }): Promise<Basket> {
    const {
      where,
      data: { amount },
    } = params;

    const basketLastHistory = await this.prisma.basketHistory.findFirst({
      where: {
        basketId: where.id,
        to: null,
      },
    });

    const { id, basketId, ...prevBasketHistory } = basketLastHistory;

    const dataForNewBasketHistory = {
      ...prevBasketHistory,
      amount,
    };

    return this.prisma.basket.update({
      where,
      data: {
        amount,
        basketHistories: {
          update: {
            where: {
              id: basketLastHistory.id,
            },
            data: {
              to: new Date(),
            },
          },
          create: [dataForNewBasketHistory],
        },
      },
    });
  }

  async deleteBasket(where: Prisma.BasketWhereUniqueInput): Promise<Basket> {
    return this.prisma.basket.delete({
      where,
    });
  }
}
