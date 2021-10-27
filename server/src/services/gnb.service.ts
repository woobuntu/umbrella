import { Gnb } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class GnbService {
  constructor(private prisma: PrismaService) {}

  async gnbs(): Promise<Gnb[]> {
    return this.prisma.gnb.findMany();
  }
}
