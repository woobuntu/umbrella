import { Module } from '@nestjs/common';
import { DeliveryResolver } from 'src/resolvers';
import { DeliveryService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeliveryService, DeliveryResolver],
  exports: [DeliveryService],
})
export class DeliveryModule {}
