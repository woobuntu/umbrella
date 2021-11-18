import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply } from 'fastify';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { SessionService } from 'src/services';
import { SessionConfig } from 'src/types/config';

// https://stackoverflow.com/questions/63195571/unable-to-set-cookie-in-nestjs-graphql
@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor(
    private sessionService: SessionService,
    private configService: ConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    isAuthenticated: boolean;
  }> {
    return next.handle().pipe(
      concatMap((userInfoFromDB) => {
        // naverSignIn mutation이 유저 정보를 반환하지 않으면 false반환
        if (!userInfoFromDB) return of(false);

        // naverSignIn mutation이 유저 정보를 반환하면 session setup
        const ctx = GqlExecutionContext.create(context);
        const { request } = ctx.getContext();
        const {
          session,
          sessionStore,
          raw: {
            headers: { timestamp },
          },
        } = request;
        const { sessionId, cookie } = session;
        session.user = userInfoFromDB;

        console.log('setCookieInterceptor - 1', sessionId, sessionStore);

        return this.sessionService
          .setSession({
            session,
            sessionStore,
          })
          .pipe(
            tap(() => {
              const reply: FastifyReply = ctx.getContext().reply;

              const sessionDuration =
                this.configService.get<SessionConfig>('duration');

              reply.setCookie('JSESSIONID', sessionId, {
                ...cookie,
                expires: new Date(timestamp + sessionDuration),
              });

              console.log('setCookieInterceptor - 2', sessionStore);

              this.sessionService.setExpires({
                sessionId,
                sessionStore,
              });

              console.log('setCookieInterceptor - 3', sessionStore);
            }),
            // 에러 없이 cookie와 세션 유효기간 설정했으면 true 반환
            map(() => true),
          );
      }),
      map((isAuthenticated) => ({
        isAuthenticated,
      })),
      catchError((error) => {
        console.log('Error : ', error);
        return of({ isAuthenticated: false });
      }),
    );
  }
}
