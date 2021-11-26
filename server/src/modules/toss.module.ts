import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TossService } from 'src/services';

@Module({
  imports: [HttpModule],
  providers: [TossService],
  exports: [TossService],
})
export class TossModule {}
