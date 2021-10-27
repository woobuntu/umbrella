import { Module } from '@nestjs/common';
import { LnbService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LnbService],
  exports: [LnbService],
})
export class LnbModule {}
