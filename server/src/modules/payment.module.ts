import { Module } from '@nestjs/common';
import { PaymentResolver } from 'src/resolvers';
import { PaymentService } from 'src/services';
import { BasketModule } from './basket.module';
import { DeliveryModule } from './delivery.module';
import { KakaoModule } from './kakao.module';
import { OrdererModule } from './orderer.module';
import { PurchaseModule } from './purchase.module';
import { TossModule } from './toss.module';

@Module({
  imports: [
    TossModule,
    BasketModule,
    KakaoModule,
    OrdererModule,
    DeliveryModule,
    PurchaseModule,
  ],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
