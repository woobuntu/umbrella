import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
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
    return this.prisma.user.create({
      data: {
        ...data,
        userHistories: {
          create: [data],
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
        email: where.email,
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
          create: [dataForNewUserHistory],
        },
      },
    });
  }
}
