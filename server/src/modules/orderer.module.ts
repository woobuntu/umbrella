import { Module } from '@nestjs/common';
import { OrdererService } from 'src/services';

@Module({
  providers: [OrdererService],
  exports: [OrdererService],
})
export class OrdererModule {}
