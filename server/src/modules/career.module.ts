import { Module } from '@nestjs/common';
import { CareerService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CareerService],
  exports: [CareerService],
})
export class CareerModule {}
