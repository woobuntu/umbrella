import { Module } from '@nestjs/common';
import { HistoryResolver } from 'src/resolvers';
import { HistoryService } from 'src/services';

@Module({
  providers: [HistoryService, HistoryResolver],
})
export class HistoryModule {}
