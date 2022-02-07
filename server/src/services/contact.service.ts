import { Contact, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async contact(): Promise<Contact | null> {
    return this.prisma.contact.findUnique({
      where: {
        id: 1,
      },
    });
  }
}
