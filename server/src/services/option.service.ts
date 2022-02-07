import { Option, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  async option(
    optionWhereUniqueInput: Prisma.OptionWhereUniqueInput,
  ): Promise<Option> {
    return this.prisma.option.findUnique({
      where: optionWhereUniqueInput,
    });
  }
}
