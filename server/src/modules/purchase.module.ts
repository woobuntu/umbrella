import { Module } from '@nestjs/common';
import { PurchaseResolver } from 'src/resolvers';
import { PurchaseService } from 'src/services';
import { BasketModule } from './basket.module';
import { DeliveryModule } from './delivery.module';
import { OrdererModule } from './orderer.module';
import { PaymentModule } from './payment.module';
import { PrismaModule } from './prisma.module';
import { SendgridModule } from './sendgrid.module';
import { TossModule } from './toss.module';

@Module({
  imports: [
    PrismaModule,
    BasketModule,
    OrdererModule,
    DeliveryModule,
    PaymentModule,
    TossModule,
    SendgridModule,
  ],
  providers: [PurchaseService, PurchaseResolver],
})
export class PurchaseModule {}
