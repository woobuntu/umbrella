import { Module } from '@nestjs/common';
import { ExecutiveFileRelationResolver } from 'src/resolvers/executive-file-relation.resolver';
import { ExecutiveFileRelationService } from 'src/services';
import { FileModule } from './file.module';

@Module({
  imports: [FileModule],
  providers: [ExecutiveFileRelationService, ExecutiveFileRelationResolver],
  exports: [ExecutiveFileRelationService],
})
export class ExecutiveFileRelationModule {}
