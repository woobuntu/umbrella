import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: { session },
    } = ctx.getContext();

    return session.get('user');
  },
);
