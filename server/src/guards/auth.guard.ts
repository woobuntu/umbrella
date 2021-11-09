import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { promisify } from 'util';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { request } = ctx.getContext();
    const {
      sessionStore,
      cookies: { JSESSIONID },
    } = request;

    const getSession = promisify(sessionStore.get.bind(sessionStore));

    return getSession(JSESSIONID);
  }
}
