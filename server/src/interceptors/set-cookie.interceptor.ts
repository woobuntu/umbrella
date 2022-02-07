import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { userInfo } from 'os';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { EnvironmentConfig } from 'src/types/config';

// https://stackoverflow.com/questions/63195571/unable-to-set-cookie-in-nestjs-graphql
@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    role: string;
  }> {
    return next.handle().pipe(
      tap(({ user }) => {
        if (!user) throw new Error();

        const ctx = GqlExecutionContext.create(context);
        const {
          request: {
            session,
            raw: {
              headers: { timestamp },
            },
          },
        } = ctx.getContext();

        session.set('user', user);

        const { expires } =
          this.configService.get<EnvironmentConfig>('environment');

        const calculatedExpires = new Date(Number(timestamp) + Number(expires));

        session.options({
          expires: calculatedExpires,
        });
      }),
      map(({ user, redirectUrl }) => {
        const { adminId } =
          this.configService.get<EnvironmentConfig>('environment');

        return { role: user.id === adminId ? 'admin' : 'user', redirectUrl };
      }),
      catchError(() => of({ role: 'non-user', redirectUrl: '/' })),
      // 에러 페이지를 달리 만들지는 고민 중
    );
  }
}
