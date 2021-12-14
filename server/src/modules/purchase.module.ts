import { Module } from '@nestjs/common';
import { PurchaseResolver } from 'src/resolvers';
import { PurchaseService } from 'src/services';
import { BasketModule } from './basket.module';
import { CatalogOptionRelationModule } from './catalog-option-relation.module';
import { DeliveryModule } from './delivery.module';
import { KakaoModule } from './kakao.module';
import { OrdererModule } from './orderer.module';
import { PaymentModule } from './payment.module';
import { SendgridModule } from './sendgrid.module';
import { TossModule } from './toss.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    BasketModule,
    OrdererModule,
    DeliveryModule,
    PaymentModule,
    TossModule,
    KakaoModule,
    SendgridModule,
    CatalogOptionRelationModule,
    UserModule,
  ],
  providers: [PurchaseService, PurchaseResolver],
})
export class PurchaseModule {}
