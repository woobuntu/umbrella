import { Account } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async account(): Promise<Account> {
    return this.prisma.account.findUnique({
      where: {
        id: 1,
      },
    });
  }
}
