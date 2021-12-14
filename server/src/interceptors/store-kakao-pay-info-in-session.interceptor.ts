import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

export class StoreKakaoPayInfoInSession implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: { session },
    } = ctx.getContext();

    return next.handle().pipe(
      tap(({ tid, partnerOrderId }) => {
        session.set('kakaoPayInfo', {
          tid,
          partnerOrderId,
        });
      }),
    );
  }
}
