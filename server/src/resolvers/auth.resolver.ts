import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthState, User } from 'src/graphql/types/user';
import { NaverAuthPayload } from 'src/graphql/types/user/naver-auth-payload.input';
import { SetCookieInterceptor, SignOutInterceptor } from 'src/interceptors';
import { AuthService, SessionService } from 'src/services';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

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

  @Query((returns) => AuthState)
  async isAuthenticated(@Context() context) {
    const {
      request: { sessionStore, cookies },
    } = context;

    const session = await this.sessionService.getSession({
      sessionId: cookies?.JSESSIONID,
      sessionStore,
    });

    return { isAuthenticated: session ? true : false };
  }
}
