import { Module } from '@nestjs/common';
import { AccountResolver } from 'src/resolvers';
import { AccountService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
