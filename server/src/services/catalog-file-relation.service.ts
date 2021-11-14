import { CatalogFileRelation } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyCatalogFileRelation } from 'src/types/catalog-file-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class CatalogFileRelationService {
  constructor(private prisma: PrismaService) {}

  async catalogFileRelations(
    params: FindManyCatalogFileRelation,
  ): Promise<CatalogFileRelation[]> {
    return this.prisma.catalogFileRelation.findMany(params);
  }
}
