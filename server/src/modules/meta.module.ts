import { Module } from '@nestjs/common';
import { MetaResolver } from 'src/resolvers';
import { MetaService } from 'src/services';
import { MetaFileRelationModule } from './meta-file-relation.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, MetaFileRelationModule],
  providers: [MetaService, MetaResolver],
})
export class MetaModule {}
