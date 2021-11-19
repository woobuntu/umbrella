import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { catchError, map, Observable, of, tap } from 'rxjs';

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
          request: { session },
        } = ctx.getContext();
        session.set('user', data);
      }),
      map(() => ({ isAuthenticated: true })),
      catchError(() => of({ isAuthenticated: false })),
    );
  }
}
