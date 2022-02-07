import { Injectable } from '@nestjs/common';
import {
  catchError,
  concatMap,
  EMPTY,
  forkJoin,
  from,
  map,
  Observable,
  of,
} from 'rxjs';
import { NaverAuthPayload } from 'src/types/user';
import { UserService } from './user.service';
import { NaverService } from './naver.service';
import { User } from '.prisma/client';
import { KakaoService } from './kakao.service';
import { GoogleService } from './google.service';

@Injectable()
export class AuthService {
  constructor(
    private naverService: NaverService,
    private kakaoService: KakaoService,
    private googleService: GoogleService,
    private userService: UserService,
  ) {}

  // 회원가입
  naverSignIn(naverAuthPayload: NaverAuthPayload): Observable<User | null> {
    // 토큰 요청
    return this.naverService.getTokens(naverAuthPayload).pipe(
      concatMap((tokens) =>
        forkJoin([
          of(tokens),
          // 회원 정보 요청
          this.naverService.getUserInfo(tokens.accessToken),
        ]),
      ),
      concatMap(([tokens, userInfoFromNaver]) =>
        forkJoin([
          of(tokens),
          of(userInfoFromNaver),
          from(this.userService.user({ id: userInfoFromNaver.id })),
        ]),
      ),
      concatMap(([tokens, userInfoFromNaver, userInfoFromDB]) => {
        // 회원가입
        if (!userInfoFromDB) {
          return from(
            this.userService.createUser({
              ...userInfoFromNaver,
              ...tokens,
            }),
          );
        }
        // 토큰이 변경되지 않은 경우
        if (
          userInfoFromDB.accessToken === tokens.accessToken &&
          userInfoFromDB.refreshToken === tokens.refreshToken
        ) {
          return of(userInfoFromDB);
        }
        // 토큰이 변경된 경우
        return from(
          this.userService.updateTokens({
            where: {
              id: userInfoFromDB.id,
            },
            data: tokens,
          }),
        );
      }),
      map((userInfoFromDB) => userInfoFromDB),
      catchError((error) => {
        console.log('Error : ', error);
        return of(null);
      }),
    );
  }

  naverSignOut(id: string, accessToken: string): Observable<{ role: string }> {
    return this.naverService.deleteTokens(accessToken).pipe(
      concatMap(() =>
        from(
          this.userService.updateTokens({
            where: {
              id,
            },
            data: {
              accessToken: null,
              refreshToken: null,
            },
          }),
        ),
      ),
      catchError(() => of(EMPTY)),
      map(() => ({ role: 'non-user' })),
    );
  }

  kakaoSignIn(code: string): Observable<User | null> {
    return this.kakaoService.getTokens(code).pipe(
      concatMap((tokens) =>
        forkJoin([
          of(tokens),
          this.kakaoService.getUserInfo(tokens.accessToken),
        ]),
      ),
      concatMap(([tokens, userInfoFromKakao]) =>
        forkJoin([
          of(tokens),
          of(userInfoFromKakao),
          from(this.userService.user({ id: userInfoFromKakao.id })),
        ]),
      ),
      concatMap(([tokens, userInfoFromKakao, userInfoFromDB]) => {
        if (!userInfoFromDB) {
          return from(
            this.userService.createUser({
              ...userInfoFromKakao,
              ...tokens,
            }),
          );
        }

        if (
          userInfoFromDB.accessToken === tokens.accessToken &&
          userInfoFromDB.refreshToken === tokens.refreshToken
        ) {
          return of(userInfoFromDB);
        }

        return from(
          this.userService.updateTokens({
            where: {
              id: userInfoFromDB.id,
            },
            data: tokens,
          }),
        );
      }),
      map((userInfoFromDB) => userInfoFromDB),
      catchError((error) => {
        console.log('Error : ', error);
        return of(null);
      }),
    );
  }

  kakaoSignOut(accessToken: string): Observable<{ role: 'non-user' }> {
    return this.kakaoService.signOut(accessToken).pipe(
      concatMap(({ id }) =>
        // 카카오 서버의 토큰을 만료시켰으니 db의 토큰도 삭제
        from(
          this.userService.updateTokens({
            where: {
              id,
            },
            data: {
              accessToken: null,
              refreshToken: null,
            },
          }),
        ),
      ),
      catchError(() => of(EMPTY)),
      map(() => ({ role: 'non-user' })),
    );
  }

  googleSignIn(jwt: string): Observable<User | null> {
    const userInfoFromGoogle = this.googleService.parseJwt(jwt);
    return from(
      this.userService.user({
        id: userInfoFromGoogle.id,
      }),
    ).pipe(
      concatMap((userInfoFromDB) => {
        if (!userInfoFromDB) {
          return from(this.userService.createUser(userInfoFromGoogle));
        }

        return of(userInfoFromDB);
      }),
      map((userInfoFromDB) => userInfoFromDB),
      catchError((error) => {
        console.log('Error : ', error);
        return of(null);
      }),
    );
  }
}
