import { Prisma, File } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async file(
    fileWhereUniqueInput: Prisma.FileWhereUniqueInput,
  ): Promise<File | null> {
    return this.prisma.file.findUnique({
      where: fileWhereUniqueInput,
    });
  }
}
