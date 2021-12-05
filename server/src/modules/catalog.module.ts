import { forwardRef, Module } from '@nestjs/common';
import { CatalogResolver } from 'src/resolvers';
import { CatalogService } from 'src/services';
import { CatalogFileRelationModule } from './catalog-file-relation.module';
import { CatalogOptionRelationModule } from './catalog-option-relation.module';

@Module({
  imports: [
    CatalogFileRelationModule,
    forwardRef(() => CatalogOptionRelationModule),
  ],
  providers: [CatalogService, CatalogResolver],
  exports: [CatalogService],
})
export class CatalogModule {}
