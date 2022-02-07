import { Injectable } from '@nestjs/common';
import { FindManyPerformanceFileRelationParams } from 'src/types/performance-file-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class PerformanceFileRelationService {
  constructor(private prisma: PrismaService) {}

  async performanceFileRelations(
    params: FindManyPerformanceFileRelationParams,
  ) {
    return this.prisma.performanceFileRelation.findMany(params);
  }
}
