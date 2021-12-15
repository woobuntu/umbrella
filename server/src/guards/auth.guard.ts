import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: { session },
    } = ctx.getContext();

    const sessionUser = session.get('user');

    if (!sessionUser) return false;

    const dbUser = await this.userService.user({
      id: sessionUser.id,
    });

    // accessToken이나 refreshToken의 변화를 반영하기 위함
    session.set('user', dbUser);

    return true;
  }
}
