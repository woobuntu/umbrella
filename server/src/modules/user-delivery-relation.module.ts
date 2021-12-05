import { Module } from '@nestjs/common';
import { UserDeliveryRelationResolver } from 'src/resolvers';
import { UserDeliveryRelationService } from 'src/services';
import { DeliveryModule } from './delivery.module';

@Module({
  imports: [DeliveryModule],
  providers: [UserDeliveryRelationService, UserDeliveryRelationResolver],
  exports: [UserDeliveryRelationService],
})
export class UserDeliveryRelationModule {}
