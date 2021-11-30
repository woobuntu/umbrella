import { Injectable } from '@nestjs/common';
import { FindManyUserDeliveryRelationParams } from 'src/types/user-delivery-relation';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserDeliveryRelationService {
  constructor(private prisma: PrismaService) {}

  async userDeliveryRelations(params: FindManyUserDeliveryRelationParams) {
    return this.prisma.userDeliveryRelation.findMany(params);
  }
}
