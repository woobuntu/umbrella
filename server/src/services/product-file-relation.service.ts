import { ProductFileRelation } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyProductFileRelation } from 'src/types/product-file-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProductFileRelationService {
  constructor(private prisma: PrismaService) {}

  async productFileRelations(
    params: FindManyProductFileRelation,
  ): Promise<ProductFileRelation[]> {
    return this.prisma.productFileRelation.findMany(params);
  }
}
