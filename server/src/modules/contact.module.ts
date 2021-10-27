import { Module } from '@nestjs/common';
import { ContactResolver } from 'src/resolvers';
import { ContactService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContactService, ContactResolver],
})
export class ContactModule {}
