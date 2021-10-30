import { Module } from '@nestjs/common';
import { CatalogResolver } from 'src/resolvers';
import { CatalogService } from 'src/services';
import { CatalogFileRelationModule } from './catalog-file-relation.module';
import { CatalogOptionRelationModule } from './catalog-option-relation.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    CatalogFileRelationModule,
    CatalogOptionRelationModule,
  ],
  providers: [CatalogService, CatalogResolver],
})
export class CatalogModule {}
