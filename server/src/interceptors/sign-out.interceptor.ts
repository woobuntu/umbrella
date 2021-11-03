import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { concatMap, Observable, tap } from 'rxjs';
import { SessionService } from 'src/services';

@Injectable()
export class SignOutInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const {
      request: {
        cookies: { JSESSIONID },
        sessionStore,
      },
    } = ctx.getContext();

    return this.sessionService
      .destroySession({
        sessionId: JSESSIONID,
        sessionStore,
      })
      .pipe(concatMap(() => next.handle()));
  }
}
