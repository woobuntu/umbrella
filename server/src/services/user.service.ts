import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from 'src/graphql/types/user';
import { Tokens } from 'src/types/user';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const emptyDelivery = {
      name: '',
      phone: '010--',
      postCode: '',
      address: '',
      detailAddress: '',
    };
    const createDefaultDelivery = this.prisma.delivery.create({
      data: {
        ...emptyDelivery,
        deliveryHistories: {
          create: emptyDelivery,
        },
      },
    });
    const { id, ...dataForNewUserHistory } = data;
    const createUser = this.prisma.user.create({
      data: {
        ...data,
        userHistories: {
          create: dataForNewUserHistory,
        },
      },
    });

    const [defaultDelivery, user] = await this.prisma.$transaction([
      createDefaultDelivery,
      createUser,
    ]);

    await this.prisma.userDeliveryRelation.create({
      data: {
        userId: user.id,
        deliveryId: defaultDelivery.id,
        default: true,
      },
    });

    return user;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserInput;
  }): Promise<User> {
    const { where, data } = params;

    const userLastHistory = await this.prisma.userHistory.findFirst({
      where: {
        userId: where.id,
        to: null,
      },
    });

    const { id, userId, ...prevUserHistory } = userLastHistory;

    const dataForNewUserHistory = {
      ...prevUserHistory,
      ...data,
    };

    return this.prisma.user.update({
      where,
      data: {
        ...data,
        userHistories: {
          update: {
            where: {
              id: userLastHistory.id,
            },
            data: {
              to: new Date(),
            },
          },
          create: dataForNewUserHistory,
        },
      },
    });
  }

  async updateTokens(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Tokens;
  }): Promise<User> {
    const { where, data } = params;

    const userLastHistory = await this.prisma.userHistory.findFirst({
      where: {
        userId: where.id,
        to: null,
      },
    });

    const { id, userId, ...prevUserHistory } = userLastHistory;

    const dataForNewUserHistory = {
      ...prevUserHistory,
      ...data,
    };

    return this.prisma.user.update({
      where,
      data: {
        // 1. 해당 user의 토큰을 갱신
        ...data,
        userHistories: {
          // 2. user의 토큰이 갱신되었으니 해당 user의 기존 마지막 이력 마감
          update: {
            where: {
              id: userLastHistory.id,
            },
            data: {
              to: new Date(),
            },
          },
          // 3. 새 이력 시작
          create: dataForNewUserHistory,
        },
      },
    });
  }
}
