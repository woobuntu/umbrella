import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { NaverAuthPayload, Tokens } from 'src/types/user';
import { map, Observable } from 'rxjs';
import { Prisma } from '.prisma/client';
import { NaverConfig } from 'src/types/config';

@Injectable()
export class NaverService {
  clientId: string;
  clientSecret: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    const { clientId, clientSecret } =
      this.configService.get<NaverConfig>('naver');

    this.clientId = encodeURIComponent(clientId);

    this.clientSecret = encodeURIComponent(clientSecret);
  }

  getTokens({ code, state }: NaverAuthPayload): Observable<Tokens> {
    const redirectUri = 'http://localhost:3000/';
    const url =
      'https://nid.naver.com/oauth2.0/token' +
      '?grant_type=authorization_code' +
      `&client_id=${this.clientId}` +
      `&client_secret=${this.clientSecret}` +
      `&redirect_uri=${redirectUri}` +
      `&code=${code}` +
      `&state=${state}`;

    return this.httpService
      .get(url, {
        headers: {
          'X-Naver-Client-Id': this.clientId,
          'X-Naver-Client-Secret': this.clientSecret,
        },
      })
      .pipe(
        map((response) => {
          if (response.data.error)
            throw new Error(response.data.error_description);
          // AccessToken 값은 일부 특수문자가 포함되어 있기 때문에 GET Parameter를 통하여 데이터를 전달하는 경우,
          // AccessToken 값을 반드시 URL Encode 처리한 후에 전송하여야합니다.
          return {
            accessToken: encodeURIComponent(response.data.access_token),
            refreshToken: encodeURIComponent(response.data.refresh_token),
          };
        }),
      );
  }

  updateTokens(refreshToken: string): Observable<Tokens> {
    const url =
      'https://nid.naver.com/oauth2.0/token' +
      '?grant_type=refresh_token' +
      `&client_id=${this.clientId}` +
      `&client_secret=${this.clientSecret}` +
      `&refresh_token=${refreshToken}`;

    return this.httpService.get(url).pipe(
      map((response) => ({
        accessToken: encodeURIComponent(response.data.access_token),
        refreshToken: encodeURIComponent(response.data.refresh_token),
      })),
    );
  }

  deleteTokens(accessToken: string): Observable<AxiosResponse> {
    const url =
      'https://nid.naver.com/oauth2.0/token' +
      '?grant_type=delete' +
      `&client_id=${this.clientId}` +
      `&client_secret=${this.clientSecret}` +
      `&access_token=${accessToken}` +
      '&service_provider=NAVER';

    return this.httpService.get(url);
  }

  getUserInfo(accessToken: string): Observable<Prisma.UserCreateInput> {
    const url = 'https://openapi.naver.com/v1/nid/me';
    return this.httpService
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        map(({ data }) => ({
          ...data.response,
          id: `NAVER ${data.response.id}`,
        })),
      );
  }
}
