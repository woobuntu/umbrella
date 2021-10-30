import { Module } from '@nestjs/common';
import { CatalogOptionRelationResolver } from 'src/resolvers';
import { CatalogOptionRelationService } from 'src/services';
import { OptionModule } from './option.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, OptionModule],
  providers: [CatalogOptionRelationService, CatalogOptionRelationResolver],
  exports: [CatalogOptionRelationService],
})
export class CatalogOptionRelationModule {}
