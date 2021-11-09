import { CatalogOptionRelation, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyCatalogOptionRelationParams } from 'src/types/catalog-option-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class CatalogOptionRelationService {
  constructor(private prisma: PrismaService) {}

  async catalogOptionRelation(
    catalogOptionRelationWhereUniqueInput: Prisma.CatalogOptionRelationWhereUniqueInput,
  ): Promise<CatalogOptionRelation> {
    return this.prisma.catalogOptionRelation.findUnique({
      where: catalogOptionRelationWhereUniqueInput,
    });
  }

  async catalogOptionRelations(
    params: FindManyCatalogOptionRelationParams,
  ): Promise<CatalogOptionRelation[]> {
    return this.prisma.catalogOptionRelation.findMany(params);
  }
}
