import { Module } from '@nestjs/common';
import { LnbService } from 'src/services';

@Module({
  providers: [LnbService],
  exports: [LnbService],
})
export class LnbModule {}
