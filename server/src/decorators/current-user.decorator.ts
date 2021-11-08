import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { promisify } from 'util';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { request } = ctx.getContext();
    const {
      sessionStore,
      cookies: { JSESSIONID },
    } = request;

    const getSession = promisify(sessionStore.get.bind(sessionStore));

    const { user } = await getSession(JSESSIONID);

    return user;
  },
);
