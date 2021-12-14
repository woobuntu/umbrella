import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KakaoService } from 'src/services';
import { UserModule } from './user.module';

@Module({
  imports: [HttpModule, UserModule],
  providers: [KakaoService],
  exports: [KakaoService],
})
export class KakaoModule {}
