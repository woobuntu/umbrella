import { Basket, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateBasket, FindManyBasketParams } from 'src/types/basket';
import { DayjsService } from './dayjs.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class BasketService {
  constructor(
    private prisma: PrismaService,
    private dayjsService: DayjsService,
  ) {}

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
          create: {
            ...data,
            from: this.dayjsService.getCurrentTime(),
          },
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

    const currentTime = this.dayjsService.getCurrentTime();

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
              to: currentTime,
            },
          },
          create: {
            ...dataForNewBasketHistory,
            from: currentTime,
          },
        },
      },
    });
  }

  async deleteBasket(where: Prisma.BasketWhereUniqueInput): Promise<Basket> {
    return this.prisma.basket.delete({
      where,
    });
  }

  async getBasketInfoForKakaoPay(userId: string) {
    const baskets = await this.prisma.basket.findMany({
      where: {
        userId,
      },
      include: {
        catalogOptionRelation: {
          include: {
            catalog: true,
            option: true,
          },
        },
      },
    });

    const orderName = this.makeOrderName(baskets);
    const totalQuantity = baskets.length;
    const productsAmount = this.sumBasketsAmount(baskets);
    const deliveryFee = this.calculateDeliveryFee(productsAmount);

    return {
      orderName,
      totalQuantity,
      totalAmount: productsAmount + deliveryFee,
    };
  }

  makeOrderName(baskets: any[]) {
    const basketNames = baskets.map(
      ({ catalogOptionRelation: { catalog, option } }) => ({
        catalogName: catalog.name,
        optionName: option.name,
      }),
    );

    let orderName = '';
    if (basketNames.length === 1) {
      const [{ catalogName, optionName }] = basketNames;
      orderName = `${catalogName} - ${optionName}`;
    } else if (basketNames.length > 1) {
      const [{ catalogName, optionName }] = basketNames;
      orderName = `${catalogName}(${optionName}) 포함 ${basketNames.length}건`;
    }

    return orderName;
  }

  sumBasketsAmount(baskets: any[]) {
    return baskets.reduce(
      (sum, { amount, catalogOptionRelation: { catalog, option } }) =>
        sum + amount * (catalog.price + option.price),
      0,
    );
  }

  calculateDeliveryFee(productsAmount: number) {
    return productsAmount > 30000 ? 0 : 3000;
  }
}
