import { Module } from '@nestjs/common';
import { MetaFileRelationResolver } from 'src/resolvers';
import { MetaFileRelationService } from 'src/services';
import { FileModule } from './file.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, FileModule],
  providers: [MetaFileRelationService, MetaFileRelationResolver],
  exports: [MetaFileRelationService],
})
export class MetaFileRelationModule {}
