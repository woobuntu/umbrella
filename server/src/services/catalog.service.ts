import { Catalog, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async catalog(
    catalogWhereUniqueInput: Prisma.CatalogWhereUniqueInput,
  ): Promise<Catalog | null> {
    return this.prisma.catalog.findUnique({
      where: catalogWhereUniqueInput,
    });
  }

  async catalogs(): Promise<Catalog[]> {
    return this.prisma.catalog.findMany();
  }
}
