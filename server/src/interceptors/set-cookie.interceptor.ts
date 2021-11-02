import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply } from 'fastify';
import { map, Observable, tap } from 'rxjs';

// https://stackoverflow.com/questions/63195571/unable-to-set-cookie-in-nestjs-graphql
@Injectable()
export class SetCookieInterceptors implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    isAuthenticated: boolean;
  }> {
    return next.handle().pipe(
      tap((userInfoFromDB) => {
        // 인증된 경우에만 sessionId 반환
        if (userInfoFromDB) {
          const ctx = GqlExecutionContext.create(context);

          const { request } = ctx.getContext();

          const { session, sessionStore } = request;

          const { sessionId, cookie } = session;

          session.user = userInfoFromDB;

          sessionStore.set(sessionId, session, () => {
            const reply: FastifyReply = ctx.getContext().reply;

            reply.setCookie('JSESSIONID', sessionId, cookie);

            const sessionDuration = this.configService.get('SESSION_DURATION');

            setTimeout(() => {
              sessionStore.destroy(sessionId, () => {
                // 이렇게 콜백을 설정하면 memory leak이 발생하는 것이 아닌가...
              });
            }, sessionDuration);
          });
        }
      }),
      map((userInfoFromDB) => ({
        isAuthenticated: userInfoFromDB ? true : false,
      })),
    );
  }
}
