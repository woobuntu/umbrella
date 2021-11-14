import { forwardRef, Module } from '@nestjs/common';
import { CatalogOptionRelationResolver } from 'src/resolvers';
import { CatalogOptionRelationService } from 'src/services';
import { CatalogModule } from './catalog.module';
import { OptionModule } from './option.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, forwardRef(() => CatalogModule), OptionModule],
  providers: [CatalogOptionRelationService, CatalogOptionRelationResolver],
  exports: [CatalogOptionRelationService],
})
export class CatalogOptionRelationModule {}
