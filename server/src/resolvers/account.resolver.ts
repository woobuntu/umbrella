import { Query, Resolver } from '@nestjs/graphql';
import { Account } from 'src/graphql/types/account';
import { AccountService } from 'src/services';

@Resolver((of) => Account)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Query((returns) => Account)
  async account() {
    return this.accountService.account();
  }
}
