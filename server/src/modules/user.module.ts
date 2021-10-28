import { Module } from '@nestjs/common';
import { UserService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
