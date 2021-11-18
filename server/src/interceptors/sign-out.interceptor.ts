import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply } from 'fastify';
import { Observable, tap } from 'rxjs';
import { SessionService } from 'src/services';

@Injectable()
export class SignOutInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const ctx = GqlExecutionContext.create(context);
        const {
          request: {
            cookies: { JSESSIONID },
            sessionStore,
          },
        } = ctx.getContext();

        console.log('signOutIntercepter - 1', JSESSIONID, sessionStore);

        this.sessionService
          .destroySession({
            sessionId: JSESSIONID,
            sessionStore,
          })
          .pipe(
            tap(() => {
              const reply: FastifyReply = ctx.getContext().reply;

              reply.setCookie('JSESSIONID', '', {
                expires: new Date(),
              });
            }),
          )
          .subscribe(() => console.log('signOutIntercepter - 2', sessionStore));
      }),
    );
  }
}
