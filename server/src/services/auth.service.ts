import { Injectable } from '@nestjs/common';
import {
  catchError,
  concatMap,
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
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  constructor(
    private naverService: NaverService,
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  // 회원가입
  naverSignIn(naverAuthPayload: NaverAuthPayload): Observable<User | null> {
    // 토큰 요청
    return this.naverService.requestTokens(naverAuthPayload).pipe(
      // AccessToken 값은 일부 특수문자가 포함되어 있기 때문에 GET Parameter를 통하여 데이터를 전달하는 경우,
      // AccessToken 값을 반드시 URL Encode 처리한 후에 전송하여야합니다.
      map(({ accessToken, refreshToken }) => ({
        accessToken: encodeURIComponent(accessToken),
        refreshToken: encodeURIComponent(refreshToken),
      })),
      concatMap((tokens) =>
        forkJoin([
          of(tokens),
          // 회원 정보 요청
          this.naverService.validate(tokens.accessToken),
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
}
