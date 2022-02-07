import { Module } from '@nestjs/common';
import { DefaultDeliveryResolver } from 'src/resolvers';
import { DefaultDeliveryService } from 'src/services';

@Module({
  providers: [DefaultDeliveryService, DefaultDeliveryResolver],
  exports: [DefaultDeliveryService],
})
export class DefaultDeliveryModule {}
