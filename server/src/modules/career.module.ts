import { Module } from '@nestjs/common';
import { CareerService } from 'src/services';

@Module({
  providers: [CareerService],
  exports: [CareerService],
})
export class CareerModule {}
