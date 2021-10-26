import { Meta } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MetaService {
  constructor(private prisma: PrismaService) {}

  async meta(): Promise<Meta | null> {
    return this.prisma.meta.findUnique({
      where: {
        id: 1,
      },
    });
  }
}
