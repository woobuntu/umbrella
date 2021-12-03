import { Module } from '@nestjs/common';
import { AuthService } from 'src/services';
import { UserModule } from './user.module';
import { NaverModule } from './naver.module';
import { AuthResolver } from 'src/resolvers';
import { KakaoModule } from './kakao.module';
import { GoogleModule } from './google.module';
import { BasketModule } from './basket.module';
import { UserDeliveryRelationModule } from './user-delivery-relation.module';

@Module({
  imports: [
    NaverModule,
    UserModule,
    KakaoModule,
    GoogleModule,
    BasketModule,
    UserDeliveryRelationModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
