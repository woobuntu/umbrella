import { Module } from '@nestjs/common';
import { DeliveryService } from 'src/services';

@Module({
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
