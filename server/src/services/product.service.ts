import { Product, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyProductParams } from 'src/types/product';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async products(params: FindManyProductParams): Promise<Product[]> {
    return this.prisma.product.findMany(params);
  }
}
