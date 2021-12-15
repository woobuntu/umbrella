import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from 'src/graphql/types/user';
import { Tokens } from 'src/types/user';
import { DayjsService } from './dayjs.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private dayjsService: DayjsService,
  ) {}

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
    const currentTime = this.dayjsService.getCurrentTime();
    const { id, ...dataForNewUserHistory } = data;
    return this.prisma.user.create({
      data: {
        ...data,
        defaultDeliveries: {
          create: {
            ...emptyDelivery,
            defaultDeliveryHistories: {
              create: {
                ...emptyDelivery,
                userId: id,
              },
            },
          },
        },
        userHistories: {
          create: {
            ...dataForNewUserHistory,
            from: currentTime,
          },
        },
      },
    });
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

    const currentTime = this.dayjsService.getCurrentTime();

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
              to: currentTime,
            },
          },
          create: {
            ...dataForNewUserHistory,
            from: currentTime,
          },
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

    const currentTime = this.dayjsService.getCurrentTime();

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
              to: currentTime,
            },
          },
          // 3. 새 이력 시작
          create: {
            ...dataForNewUserHistory,
            from: currentTime,
          },
        },
      },
    });
  }
}
