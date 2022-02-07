import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/services';
import { EnvironmentConfig } from 'src/types/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: { session },
    } = ctx.getContext();

    const sessionUser = session.get('user');

    if (!sessionUser) return false;

    const { adminId } =
      this.configService.get<EnvironmentConfig>('environment');

    if (sessionUser.id !== adminId) return false;

    const dbUser = await this.userService.user({
      id: sessionUser.id,
    });

    // accessToken이나 refreshToken의 변화를 반영하기 위함
    session.set('user', dbUser);

    return true;
  }
}
