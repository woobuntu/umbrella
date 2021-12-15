import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

export class StoreOrdererAndDelivery implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: {
        session,
        body: {
          variables: { createOrdererInput, createDeliveryInput },
        },
      },
    } = ctx.getContext();

    session.set('orderer', createOrdererInput);
    session.set('delivery', createDeliveryInput);

    return next.handle();
  }
}
