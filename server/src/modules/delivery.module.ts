import { Module } from '@nestjs/common';
import { DeliveryResolver } from 'src/resolvers';
import { DeliveryService } from 'src/services';

@Module({
  providers: [DeliveryService, DeliveryResolver],
  exports: [DeliveryService],
})
export class DeliveryModule {}
