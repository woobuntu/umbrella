import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators';
import { AuthState, SignInInput, User } from 'src/graphql/types/user';
import { SetCookieInterceptor, SignOutInterceptor } from 'src/interceptors';
import { AuthService } from 'src/services';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseInterceptors(SetCookieInterceptor)
  @Mutation((returns) => AuthState)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    const { platform, code, state } = signInInput;

    switch (platform) {
      case 'naver':
        return this.authService.naverSignIn({ code, state });
      case 'kakao':
        return this.authService.kakaoSignIn(code);
      case 'google':
        return this.authService.googleSignIn(code);
    }
  }

  @UseInterceptors(SignOutInterceptor)
  @Mutation((returns) => AuthState)
  signOut(@CurrentUser() user: User) {
    const { id, accessToken } = user;

    const [platform] = id.split(' ');

    switch (platform) {
      case 'NAVER':
        return this.authService.naverSignOut(id, accessToken);
      case 'KAKAO':
        return this.authService.kakaoSignOut(accessToken);
      case 'GOOGLE':
        return { isAuthenticated: false };
    }
  }

  @Query((returns) => AuthState)
  async isAuthenticated(@Context() context) {
    const {
      request: { session },
    } = context;
    console.log(session);
    return session.get('user')
      ? { isAuthenticated: true }
      : { isAuthenticated: false };
  }
}
