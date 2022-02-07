import { Module } from '@nestjs/common';
import { AccountResolver } from 'src/resolvers';
import { AccountService } from 'src/services';

@Module({
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
