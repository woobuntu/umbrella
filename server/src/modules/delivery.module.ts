import { Module } from '@nestjs/common';
import { DeliveryService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
