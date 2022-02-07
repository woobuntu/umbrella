import { Module } from '@nestjs/common';
import { PerformanceResolver } from 'src/resolvers';
import { PerformanceService } from 'src/services';
import { FileModule } from './file.module';
import { PerformanceFileRelationModule } from './performance-file-relation.module';
import { S3Module } from './s3.module';

@Module({
  imports: [S3Module, FileModule, PerformanceFileRelationModule],
  providers: [PerformanceService, PerformanceResolver],
})
export class PerformanceModule {}
