import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/services';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
