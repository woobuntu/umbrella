import { UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { map, Observable, tap } from 'rxjs';
import { CurrentUser } from 'src/decorators';
import {
  AuthState,
  PublicUser,
  SignInInput,
  UpdateUserInput,
  User,
} from 'src/graphql/types/user';
import { AuthGuard } from 'src/guards';
import { SetCookieInterceptor, SignOutInterceptor } from 'src/interceptors';
import {
  AuthService,
  BasketService,
  DefaultDeliveryService,
  PaymentService,
  UserService,
} from 'src/services';
import { EnvironmentConfig } from 'src/types/config';

interface ContextWithSession {
  request: {
    session: {
      get: (param: 'user') => PublicUser | undefined;
    };
  };
}

@Resolver((of) => PublicUser)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private basketService: BasketService,
    private defaultDeliveryService: DefaultDeliveryService,
    private paymentService: PaymentService,
    private configService: ConfigService,
  ) {}

  @UseInterceptors(SetCookieInterceptor)
  @Mutation((returns) => AuthState)
  signIn(@Args('signInInput') signInInput: SignInInput): Observable<{
    user: PublicUser;
    redirectUrl: '/' | '/basket';
  }> {
    const { platform, code, state, basketInfo } = signInInput;

    let signInObservable: Observable<any | null>; // any 바꾸자

    switch (platform) {
      case 'naver':
        signInObservable = this.authService.naverSignIn({ code, state });
        break;
      case 'kakao':
        signInObservable = this.authService.kakaoSignIn(code);
        break;
      case 'google':
        signInObservable = this.authService.googleSignIn(code);
        break;
    }

    return signInObservable.pipe(
      tap(async (user) => {
        if (user && basketInfo) {
          const { productOptionRelationId, quantity } = basketInfo;

          const basket = await this.basketService.basket({
            userId: user.id,
            productOptionRelationId,
          });

          if (basket) {
            this.basketService.updateBasket({
              where: {
                id: basket.id,
              },
              data: {
                quantity,
              },
            });
          } else {
            this.basketService.createBasket({
              userId: user.id,
              productOptionRelationId,
              quantity,
            });
          }
        }
      }),
      map((user) => ({
        user,
        redirectUrl: basketInfo ? '/basket' : '/',
      })),
    );
  }

  @UseInterceptors(SignOutInterceptor)
  @Mutation((returns) => AuthState)
  signOut(@CurrentUser() user: User) {
    if (!user) return { role: 'non-user' };

    const { id, accessToken } = user;

    const [platform] = id.split(' ');

    switch (platform) {
      case 'NAVER':
        return this.authService.naverSignOut(id, accessToken);
      case 'KAKAO':
        return this.authService.kakaoSignOut(accessToken);
      case 'GOOGLE':
        return { role: 'non-user' };
    }
  }

  @Query((returns) => AuthState)
  async isAuthenticated(
    @Context()
    context: ContextWithSession,
  ) {
    const {
      request: { session },
    } = context;

    const user = session.get('user');

    const { adminId } =
      this.configService.get<EnvironmentConfig>('environment');

    if (!user) return { role: 'non-user' };

    if (user.id === adminId) return { role: 'admin' };

    if (user.id !== adminId) return { role: 'user' };
  }

  @UseGuards(AuthGuard)
  @Query((returns) => PublicUser)
  async profile(@CurrentUser() user: User) {
    return this.userService.user({ id: user.id });
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => User)
  async updateProfile(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUser({
      where: {
        id: user.id,
      },
      data: updateUserInput,
    });
  }

  @ResolveField()
  async defaultDelivery(@Parent() user: User) {
    return this.defaultDeliveryService.defaultDelivery(user.id);
  }

  @ResolveField()
  async payments(@Parent() user: User) {
    return this.paymentService.payments({
      where: {
        userId: user.id,
      },
    });
  }
}
