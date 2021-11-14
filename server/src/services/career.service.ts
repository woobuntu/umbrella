import { Career } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyCareerParams } from 'src/types/career';
import { PrismaService } from './prisma.service';

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  async careers(params: FindManyCareerParams): Promise<Career[]> {
    return this.prisma.career.findMany(params);
  }
}
