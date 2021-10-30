import { Catalog, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async catalogs(): Promise<Catalog[]> {
    return this.prisma.catalog.findMany();
  }
}
