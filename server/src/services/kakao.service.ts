import { Prisma } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { KakaoConfig } from 'src/types/config';
import { Tokens } from 'src/types/user';

@Injectable()
export class KakaoService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getTokens(code: string): Observable<Tokens> {
    const url = 'https://kauth.kakao.com/oauth/token';
    const { clientId, redirectUri } =
      this.configService.get<KakaoConfig>('kakao');

    const dataString =
      'grant_type=authorization_code' +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&code=${code}`;

    return this.httpService
      .post(url, dataString, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map(({ data }) => ({
          accessToken: encodeURIComponent(data.access_token),
          refreshToken: encodeURIComponent(data.refresh_token),
        })),
      );
  }

  signOut(accessToken: string): Observable<{
    id: string;
  }> {
    const url = 'https://kapi.kakao.com/v1/user/logout';
    const dataString = '';
    return this.httpService
      .post(url, dataString, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(map(({ data: { id } }) => ({ id: `KAKAO ${id}` })));
  }

  getUserInfo(accessToken: string): Observable<Prisma.UserCreateInput> {
    const url = 'https://kapi.kakao.com/v2/user/me';
    return this.httpService
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        map(({ data: { id, kakao_account } }) => ({
          email: kakao_account.email,
          id: `KAKAO ${id}`,
        })),
      );
  }
}
