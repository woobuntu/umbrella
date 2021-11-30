import { Module } from '@nestjs/common';
import { UserDeliveryRelationResolver } from 'src/resolvers';
import { UserDeliveryRelationService } from 'src/services';
import { DeliveryModule } from './delivery.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, DeliveryModule],
  providers: [UserDeliveryRelationService, UserDeliveryRelationResolver],
  exports: [UserDeliveryRelationService],
})
export class UserDeliveryRelationModule {}
