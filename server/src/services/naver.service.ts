import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { NaverAuthPayload, Tokens } from 'src/types/user';
import { map, Observable } from 'rxjs';
import { User } from '.prisma/client';

@Injectable()
export class NaverService {
  clientId: string;
  clientSecret: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.clientId = encodeURIComponent(
      this.configService.get<string>('NAVER_CLIENT_ID'),
    );
    this.clientSecret = encodeURIComponent(
      this.configService.get<string>('NAVER_CLIENT_SECRET'),
    );
  }

  requestTokens({ code, state }: NaverAuthPayload): Observable<Tokens> {
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

          return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          };
        }),
      );
  }

  refreshTokens(refreshToken: string): Observable<Tokens> {
    const url =
      'https://nid.naver.com/oauth2.0/token' +
      '?grant_type=refresh_token' +
      `&client_id=${this.clientId}` +
      `&client_secret=${this.clientSecret}` +
      `&refresh_token=${refreshToken}`;

    return this.httpService.get(url).pipe(
      map((response) => ({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      })),
    );
  }

  removeTokens(accessToken: string): Observable<AxiosResponse> {
    const url =
      'https://nid.naver.com/oauth2.0/token' +
      '?grant_type=delete' +
      `&client_id=${this.clientId}` +
      `&client_secret=${this.clientSecret}` +
      `&access_token=${accessToken}` +
      '&service_provider=NAVER';

    return this.httpService.get(url);
  }

  validate(accessToken: string): Observable<User> {
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
