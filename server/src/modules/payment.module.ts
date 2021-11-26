import { Module } from '@nestjs/common';
import { PaymentService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
