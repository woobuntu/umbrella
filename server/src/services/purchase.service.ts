import { Injectable } from '@nestjs/common';
import { FindManyPurchaseParams } from 'src/types/purchase';
import { PrismaService } from './prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async purchases(params: FindManyPurchaseParams) {
    return this.prisma.purchase.findMany(params);
  }
}
