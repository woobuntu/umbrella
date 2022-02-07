import { Injectable } from '@nestjs/common';
import { FindManyLnbParams } from 'src/types/lnb';
import { PrismaService } from '.';

@Injectable()
export class LnbService {
  constructor(private prisma: PrismaService) {}

  async lnbs(params: FindManyLnbParams) {
    return this.prisma.lnb.findMany(params);
  }
}
