import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccessToken, User } from 'src/graphql/types/user';
import { NaverAuthPayload } from 'src/graphql/types/user/naver-auth-payload.input';
import { AuthService } from 'src/services';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AccessToken)
  naverSignIn(@Args('naverAuthPayload') naverAuthPayload: NaverAuthPayload) {
    console.log(naverAuthPayload);
    return this.authService.naverSignIn(naverAuthPayload);
  }
}
