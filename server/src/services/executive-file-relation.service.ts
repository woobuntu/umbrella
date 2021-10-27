import { ExecutiveFileRelation } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyExecutiveFileRelationParams } from 'src/types/executive-file-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class ExecutiveFileRelationService {
  constructor(private prisma: PrismaService) {}

  async executiveFileRelations(
    params: FindManyExecutiveFileRelationParams,
  ): Promise<ExecutiveFileRelation[]> {
    return this.prisma.executiveFileRelation.findMany(params);
  }
}
