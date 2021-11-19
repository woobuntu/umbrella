import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
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
    isAuthenticated: boolean;
  }> {
    return next.handle().pipe(
      tap((data) => {
        if (!data) throw new Error();

        const ctx = GqlExecutionContext.create(context);
        const {
          request: {
            session,
            raw: {
              headers: { timestamp },
            },
          },
        } = ctx.getContext();

        session.set('user', data);

        const { expires } =
          this.configService.get<EnvironmentConfig>('environment');

        const calculatedExpires = new Date(Number(timestamp) + Number(expires));

        session.options({
          expires: calculatedExpires,
        });
      }),
      map(() => ({ isAuthenticated: true })),
      catchError(() => of({ isAuthenticated: false })),
    );
  }
}
