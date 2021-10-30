import { Module } from '@nestjs/common';
import { OptionService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OptionService],
  exports: [OptionService],
})
export class OptionModule {}
