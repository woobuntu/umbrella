import { Module } from '@nestjs/common';
import { PaymentService } from 'src/services';

@Module({
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
