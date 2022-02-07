import { Global, Module } from '@nestjs/common';
import { UserService } from 'src/services';

@Global() // AuthGuard에서 userService가 필요하므로 전역으로 설정
@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
