import { Module } from '@nestjs/common';
import { HistoryResolver } from 'src/resolvers';
import { HistoryService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HistoryService, HistoryResolver],
})
export class HistoryModule {}
