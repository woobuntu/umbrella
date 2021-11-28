import { Module } from '@nestjs/common';
import { OrdererService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OrdererService],
  exports: [OrdererService],
})
export class OrdererModule {}
