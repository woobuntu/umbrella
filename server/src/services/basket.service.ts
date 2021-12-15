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
    productOptionRelationId: number;
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
      data,
    });
  }

  async updateBasket(params: {
    where: Prisma.BasketWhereUniqueInput;
    data: {
      quantity: number;
    };
  }): Promise<Basket> {
    const { where, data } = params;

    return this.prisma.basket.update({
      where,
      data,
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
        // pro
        productOptionRelation: {
          include: {
            product: true,
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
      ({ productOptionRelation: { product, option } }) => ({
        productName: product.name,
        optionName: option.name,
      }),
    );

    let orderName = '';
    if (basketNames.length === 1) {
      const [{ productName, optionName }] = basketNames;
      orderName = `${productName} - ${optionName}`;
    } else if (basketNames.length > 1) {
      const [{ productName, optionName }] = basketNames;
      orderName = `${productName}(${optionName}) 포함 ${basketNames.length}건`;
    }

    return orderName;
  }

  sumBasketsAmount(baskets: any[]) {
    return baskets.reduce(
      (sum, { quantity, productOptionRelation: { product, option } }) =>
        sum + quantity * (product.price + option.price),
      0,
    );
  }

  calculateDeliveryFee(productsAmount: number) {
    return productsAmount > 30000 ? 0 : 3000;
  }
}
