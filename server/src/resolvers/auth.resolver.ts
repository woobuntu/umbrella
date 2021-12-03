import { UseGuards, UseInterceptors } from '@nestjs/common';
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
import { UserDeliveryRelation } from 'src/graphql/types/user-delivery-relation';
import { AuthGuard } from 'src/guards';
import { SetCookieInterceptor, SignOutInterceptor } from 'src/interceptors';
import {
  AuthService,
  BasketService,
  UserDeliveryRelationService,
  UserService,
} from 'src/services';

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
    private userDeliveryRelationService: UserDeliveryRelationService,
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
          const { catalogOptionRelationId, amount } = basketInfo;

          const basket = await this.basketService.basket({
            userId: user.id,
            catalogOptionRelationId,
          });

          if (basket) {
            this.basketService.updateBasket({
              where: {
                id: basket.id,
              },
              data: {
                amount,
              },
            });
          } else {
            this.basketService.createBasket({
              userId: user.id,
              catalogOptionRelationId,
              amount,
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
    if (!user) return { isAuthenticated: false };

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
  async isAuthenticated(
    @Context()
    context: ContextWithSession,
  ) {
    const {
      request: { session },
    } = context;

    return session.get('user')
      ? { isAuthenticated: true }
      : { isAuthenticated: false };
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
  async userDeliveryRelations(@Parent() user: PublicUser) {
    return this.userDeliveryRelationService.userDeliveryRelations({
      where: {
        userId: user.id,
      },
    });
  }
}
