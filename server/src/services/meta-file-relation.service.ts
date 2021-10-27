import { MetaFileRelation } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyMetaFileRelationParams } from 'src/types/meta-file-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class MetaFileRelationService {
  constructor(private prisma: PrismaService) {}

  async metaFileRelations(
    params: FindManyMetaFileRelationParams,
  ): Promise<MetaFileRelation[]> {
    return this.prisma.metaFileRelation.findMany(params);
  }
}
