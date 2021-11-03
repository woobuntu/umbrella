import { Module } from '@nestjs/common';
import { AuthService } from 'src/services';
import { UserModule } from './user.module';
import { NaverModule } from './naver.module';
import { AuthResolver } from 'src/resolvers';
import { SessionModule } from './session.module';

@Module({
  imports: [NaverModule, UserModule, SessionModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
