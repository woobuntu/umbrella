import { Module } from '@nestjs/common';
import { AuthService } from 'src/services';
import { NaverModule } from './naver.module';
import { AuthResolver } from 'src/resolvers';
import { KakaoModule } from './kakao.module';
import { GoogleModule } from './google.module';
import { BasketModule } from './basket.module';
import { DefaultDeliveryModule } from './default-delivery.module';
import { PaymentModule } from './payment.module';

@Module({
  imports: [
    NaverModule,
    KakaoModule,
    GoogleModule,
    BasketModule,
    DefaultDeliveryModule,
    PaymentModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
