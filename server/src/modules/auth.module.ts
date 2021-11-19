import { Module } from '@nestjs/common';
import { AuthService } from 'src/services';
import { UserModule } from './user.module';
import { NaverModule } from './naver.module';
import { AuthResolver } from 'src/resolvers';
import { KakaoModule } from './kakao.module';
import { GoogleModule } from './google.module';

@Module({
  imports: [NaverModule, UserModule, KakaoModule, GoogleModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
