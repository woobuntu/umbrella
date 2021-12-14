import { Module } from '@nestjs/common';
import { DeliveryResolver } from 'src/resolvers';
import { DeliveryService } from 'src/services';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [DeliveryService, DeliveryResolver],
  exports: [DeliveryService],
})
export class DeliveryModule {}
