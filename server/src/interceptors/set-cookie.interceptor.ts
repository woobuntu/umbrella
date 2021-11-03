import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply } from 'fastify';
import {
  catchError,
  concatMap,
  from,
  map,
  Observable,
  of,
  tap,
  timer,
} from 'rxjs';
import { promisify } from 'util';

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
      concatMap((userInfoFromDB) => {
        // naverSignIn mutation이 유저 정보를 반환하지 않으면 false반환
        if (!userInfoFromDB) return of(false);

        // naverSignIn mutation이 유저 정보를 반환하면 session setup
        const ctx = GqlExecutionContext.create(context);
        const { request } = ctx.getContext();
        const { session, sessionStore } = request;
        const { sessionId, cookie } = session;
        session.user = userInfoFromDB;

        return from(
          promisify(sessionStore.set.bind(sessionStore))(sessionId, session),
        ).pipe(
          tap(() => {
            const reply: FastifyReply = ctx.getContext().reply;
            reply.setCookie('JSESSIONID', sessionId, cookie);

            const sessionDuration = this.configService.get('SESSION_DURATION');
            timer(sessionDuration)
              .pipe(
                concatMap(() =>
                  from(
                    promisify(sessionStore.destroy.bind(sessionStore))(
                      sessionId,
                    ),
                  ),
                ),
              )
              .subscribe({
                next: () =>
                  console.log(
                    `sessionId ${sessionId} is Destroyed!`,
                    sessionStore,
                  ),
                error: (error) =>
                  console.log('Session Destroy Error : ', error),
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
        console.log(error);
        return of({ isAuthenticated: false });
      }),
    );
  }
}
