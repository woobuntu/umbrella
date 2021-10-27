import { Module } from '@nestjs/common';
import { ExecutiveResolver } from 'src/resolvers';
import { ExecutiveService } from 'src/services';
import { CareerModule } from './career.module';
import { ExecutiveFileRelationModule } from './executive-file-relation.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, CareerModule, ExecutiveFileRelationModule],
  providers: [ExecutiveService, ExecutiveResolver],
})
export class ExecutiveModule {}
