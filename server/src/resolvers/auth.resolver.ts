import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthState, User } from 'src/graphql/types/user';
import { NaverAuthPayload } from 'src/graphql/types/user/naver-auth-payload.input';
import { SetCookieInterceptor, SignOutInterceptor } from 'src/interceptors';
import { AuthService } from 'src/services';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseInterceptors(SetCookieInterceptor)
  @Mutation((returns) => AuthState)
  naverSignIn(@Args('naverAuthPayload') naverAuthPayload: NaverAuthPayload) {
    return this.authService.naverSignIn(naverAuthPayload);
  }

  @UseInterceptors(SignOutInterceptor)
  @Mutation((returns) => AuthState)
  signOut() {
    return { isAuthenticated: false };
  }
}
