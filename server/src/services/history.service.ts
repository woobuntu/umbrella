import { History } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async histories(): Promise<History[]> {
    return this.prisma.history.findMany();
  }
}
