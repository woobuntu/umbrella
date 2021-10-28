import { Injectable } from '@nestjs/common';
import { concatMap, forkJoin, from, map, Observable, of } from 'rxjs';
import { NaverAuthPayload } from 'src/types/user';
import { UserService } from './user.service';
import { NaverService } from './naver.service';

@Injectable()
export class AuthService {
  constructor(
    private naverService: NaverService,
    private userService: UserService,
  ) {}

  naverSignIn(
    naverAuthPayload: NaverAuthPayload,
  ): Observable<{ accessToken: string }> {
    return this.naverService.requestTokens(naverAuthPayload).pipe(
      // AccessToken 값은 일부 특수문자가 포함되어 있기 때문에 GET Parameter를 통하여 데이터를 전달하는 경우,
      // AccessToken 값을 반드시 URL Encode 처리한 후에 전송하여야합니다.
      map(({ accessToken, refreshToken }) => ({
        accessToken: encodeURIComponent(accessToken),
        refreshToken: encodeURIComponent(refreshToken),
      })),
      concatMap((tokens) =>
        forkJoin([of(tokens), this.naverService.validate(tokens.accessToken)]),
      ),
      concatMap(([tokens, userInfoFromNaver]) =>
        forkJoin([
          of(tokens),
          of(userInfoFromNaver),
          from(
            this.userService.user({
              email: userInfoFromNaver.email,
            }),
          ),
        ]),
      ),
      concatMap(([tokens, userInfoFromNaver, userFromDB]) => {
        // 회원가입
        if (!userFromDB)
          return from(
            this.userService.createUser({
              ...userInfoFromNaver,
              ...tokens,
            }),
          );

        // 토큰이 변경되지 않은 경우
        if (
          userFromDB.accessToken === tokens.accessToken &&
          userFromDB.refreshToken === tokens.refreshToken
        )
          return of(userFromDB);

        // 토큰이 변경된 경우
        return from(
          this.userService.updateTokens({
            where: { email: userFromDB.email },
            data: tokens,
          }),
        );
      }),
      map((user) => ({ accessToken: user.accessToken })),
    );
  }
}
