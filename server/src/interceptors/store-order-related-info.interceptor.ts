import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

export class StoreOrderRelatedInfoInSession implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: {
        session,
        body: {
          variables: { orderRelatedInfoInput },
        },
      },
    } = ctx.getContext();

    session.set('orderRelatedInfo', orderRelatedInfoInput);
    return next.handle();
  }
}
