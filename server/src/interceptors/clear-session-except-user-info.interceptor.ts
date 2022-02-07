import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

export class ClearSessionExceptUserInfo implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const ctx = GqlExecutionContext.create(context);
        const {
          request: { session },
        } = ctx.getContext();

        session.set('orderRelatedInfo', null);
        session.set('basketsAndDeliveryFee', null);
        session.set('kakaoPayInfo', null);
      }),
    );
  }
}
