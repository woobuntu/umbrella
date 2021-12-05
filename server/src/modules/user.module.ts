import { Module } from '@nestjs/common';
import { UserService } from 'src/services';

@Module({
  imports: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
