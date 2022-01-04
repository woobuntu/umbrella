import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable, tap } from 'rxjs';
import { TossConfig } from 'src/types/config';
import { RefundReceiveAccount } from 'src/types/toss';

@Injectable()
export class TossService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  approvePayment(params: {
    paymentKey: string;
    orderId: string;
    amount: number;
  }): Observable<{ method: string }> {
    const { paymentKey, orderId, amount } = params;
    const url = 'https://api.tosspayments.com' + '/v1/payments/' + paymentKey;

    return this.httpService
      .post(
        url,
        { orderId, amount },
        {
          headers: {
            Authorization: `Basic dGVzdF9za19aMFJuWVgydzUzMm5nUXY2S1pNM05leXFBcFFFOg==`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(map(({ data }) => data));
  }

  cancelPayment(params: {
    cancelReason: string;
    paymentKey: string;
    refundReceiveAccount?: RefundReceiveAccount;
  }) {
    const { cancelReason, paymentKey } = params;

    const url =
      'https://api.tosspayments.com' + `/v1/payments/${paymentKey}/cancel`;

    const requestBody: {
      cancelReason: string;
      refundReceiveAccount?: RefundReceiveAccount;
    } = { cancelReason };

    if (params.refundReceiveAccount) {
      requestBody.refundReceiveAccount = params.refundReceiveAccount;
    }

    const { clientSecret } = this.configService.get<TossConfig>('toss');

    return this.httpService
      .post(url, requestBody, {
        headers: {
          Authorization: `Basic ${clientSecret}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(map(({ data }) => data));
  }
}
