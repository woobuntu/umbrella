import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class TossService {
  constructor(private httpService: HttpService) {}

  approvePayment(params: {
    paymentKey: string;
    orderId: string;
    amount: number;
  }) {
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
}
