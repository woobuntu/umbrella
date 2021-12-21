import { Prisma } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { EnvironmentConfig, KakaoConfig } from 'src/types/config';
import { Tokens } from 'src/types/user';
import { v4 } from 'uuid';
import { UserService } from './user.service';

@Injectable()
export class KakaoService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private userService: UserService,
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

  reissueToken(userId: string): Observable<{ newAccessToken: string }> {
    const url = 'https://kauth.kakao.com/oauth/token';
    const { clientId } = this.configService.get<KakaoConfig>('kakao');

    return from(
      this.userService.user({
        id: userId,
      }),
    ).pipe(
      concatMap(({ refreshToken }) => {
        const dataString =
          `grant_type=refresh_token` +
          `&client_id=${clientId}` +
          `&refresh_token=${refreshToken}`;

        return forkJoin([
          of(refreshToken),
          this.httpService.post(url, dataString, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }),
        ]);
      }),
      // 여기서 실패하면 사용자에게 재로그인을 요청해야 하는데, 어떻게 해야 되나
      tap({
        error: (error) => console.log('!!! accessToken 재발급 실패', error),
      }),
      // session.delete()?
      map(([refreshToken, { data }]) => ({
        // refreshToken의 만료 시간이 1개월 미만으로 남은 경우 data에 새 refreshToken이 담겨서 온다
        refreshToken: data?.refresh_token ? data.refresh_token : refreshToken,
        accessToken: data.access_token,
      })),
      concatMap(({ accessToken, refreshToken }) =>
        this.userService.updateTokens({
          where: {
            id: userId,
          },
          data: {
            accessToken,
            refreshToken,
          },
        }),
      ),
      map(({ accessToken }) => ({
        newAccessToken: accessToken,
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

  preparePayment(params: {
    userId: string;
    orderName: string;
    totalQuantity: number;
    totalAmount: number;
  }): Observable<any> {
    const url = 'https://kapi.kakao.com/v1/payment/ready';

    const { userId, orderName, totalQuantity, totalAmount } = params;
    const { cid, adminKey } = this.configService.get<KakaoConfig>('kakao');
    const { clientUrl } =
      this.configService.get<EnvironmentConfig>('environment');
    const partnerOrderId = v4();

    const dataString =
      `cid=${cid}` +
      `&partner_order_id=${partnerOrderId}` +
      `&partner_user_id=${userId}` +
      `&item_name=${encodeURIComponent(orderName)}` +
      `&quantity=${totalQuantity}` +
      `&total_amount=${totalAmount}` +
      `&tax_free_amount=0` +
      `&approval_url=${clientUrl}/kakao-success` +
      `&fail_url=${clientUrl}/fail` +
      `&cancel_url=${clientUrl}/order`;

    return this.httpService
      .post(url, dataString, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `KakaoAK ${adminKey}`,
        },
      })
      .pipe(
        map(({ data }) => data),
        map(({ tid, next_redirect_pc_url, next_redirect_mobile_url }) => ({
          tid,
          partnerOrderId,
          webRedirectUrl: next_redirect_pc_url,
          mobileRedirectUrl: next_redirect_mobile_url,
        })),
      );
  }

  approvePayment(params: {
    tid: string;
    partnerOrderId: string;
    partnerUserId: string;
    pgToken: string;
  }): Observable<{ tid: string; paymentMethodType: '현금' | '카드' }> {
    const { tid, partnerOrderId, partnerUserId, pgToken } = params;

    const url = 'https://kapi.kakao.com/v1/payment/approve';

    const { cid, adminKey } = this.configService.get<KakaoConfig>('kakao');

    const dataString =
      `cid=${cid}` +
      `&tid=${tid}` +
      `&partner_order_id=${partnerOrderId}` +
      `&partner_user_id=${partnerUserId}` +
      `&pg_token=${pgToken}`;

    return this.httpService
      .post(url, dataString, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `KakaoAK ${adminKey}`,
        },
      })
      .pipe(
        map(({ data: { tid, payment_method_type } }) => ({
          tid,
          paymentMethodType: payment_method_type === 'CARD' ? '카드' : '현금',
        })),
      );
  }

  cancelPayment(params: {
    tid: string;
    cancelAmount: number;
    cancelTaxFreeAmount?: number;
  }) {
    const { tid, cancelAmount, cancelTaxFreeAmount } = params;

    const url = 'https://kapi.kakao.com/v1/payment/cancel';

    const { cid, adminKey } = this.configService.get<KakaoConfig>('kakao');

    const dataString =
      `cid=${cid}` +
      `&tid=${tid}` +
      `&cancel_amount=${cancelAmount}` +
      `&cancel_tax_free_amount=${
        cancelTaxFreeAmount ? cancelTaxFreeAmount : 0
      }`;

    return this.httpService
      .post(url, dataString, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `KakaoAK ${adminKey}`,
        },
      })
      .pipe(map(({ data }) => data));
  }
}
