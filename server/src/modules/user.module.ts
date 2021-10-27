import { Module } from '@nestjs/common';
import { UserResolver } from 'src/resolvers';
import { UserService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
