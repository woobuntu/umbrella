import { ProductOptionRelation, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyProductOptionRelationParams } from 'src/types/product-option-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProductOptionRelationService {
  constructor(private prisma: PrismaService) {}

  async productOptionRelation(
    productOptionRelationWhereUniqueInput: Prisma.ProductOptionRelationWhereUniqueInput,
  ): Promise<ProductOptionRelation> {
    return this.prisma.productOptionRelation.findUnique({
      where: productOptionRelationWhereUniqueInput,
    });
  }

  async productOptionRelations(
    params: FindManyProductOptionRelationParams,
  ): Promise<ProductOptionRelation[]> {
    return this.prisma.productOptionRelation.findMany(params);
  }
}
