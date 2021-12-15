import { Module } from '@nestjs/common';
import { MetaFileRelationResolver } from 'src/resolvers';
import { MetaFileRelationService } from 'src/services';
import { FileModule } from './file.module';

@Module({
  imports: [FileModule],
  providers: [MetaFileRelationService, MetaFileRelationResolver],
  exports: [MetaFileRelationService],
})
export class MetaFileRelationModule {}
