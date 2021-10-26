import { Module } from '@nestjs/common';
import { MetaResolver } from 'src/resolvers';
import { MetaService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MetaService, MetaResolver],
})
export class MetaModule {}
