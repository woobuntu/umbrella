import { Executive, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ExecutiveService {
  constructor(private prisma: PrismaService) {}

  async executive(
    executiveWhereUniqueInput: Prisma.ExecutiveWhereUniqueInput,
  ): Promise<Executive> {
    return this.prisma.executive.findUnique({
      where: executiveWhereUniqueInput,
    });
  }
}
