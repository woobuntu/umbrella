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
        const { session, sessionStore } = request;
        const { sessionId, cookie } = session;
        session.user = userInfoFromDB;

        return this.sessionService
          .setSession({
            session,
            sessionStore,
          })
          .pipe(
            tap(() => {
              const reply: FastifyReply = ctx.getContext().reply;
              console.log(0, request);
              console.log(1, session);

              const sessionDuration =
                this.configService.get<SessionConfig>('session.duration');

              reply.setCookie('JSESSIONID', sessionId, {
                ...cookie,
                expires: new Date(Date.now() + Number(sessionDuration)),
              });

              this.sessionService.setExpires({
                sessionId,
                sessionStore,
              });
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
