import { forwardRef, Module } from '@nestjs/common';
import { CatalogResolver } from 'src/resolvers';
import { CatalogService } from 'src/services';
import { CatalogFileRelationModule } from './catalog-file-relation.module';
import { CatalogOptionRelationModule } from './catalog-option-relation.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    CatalogFileRelationModule,
    forwardRef(() => CatalogOptionRelationModule),
  ],
  providers: [CatalogService, CatalogResolver],
  exports: [CatalogService],
})
export class CatalogModule {}
