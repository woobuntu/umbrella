import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KakaoService } from 'src/services';

@Module({
  imports: [HttpModule],
  providers: [KakaoService],
  exports: [KakaoService],
})
export class KakaoModule {}
