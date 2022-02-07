import { Module } from '@nestjs/common';
import { PerformanceFileRelationResolver } from 'src/resolvers';
import { PerformanceFileRelationService } from 'src/services';
import { FileModule } from './file.module';

@Module({
  imports: [FileModule],
  providers: [PerformanceFileRelationService, PerformanceFileRelationResolver],
  exports: [PerformanceFileRelationService],
})
export class PerformanceFileRelationModule {}
