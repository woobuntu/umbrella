import { Module } from '@nestjs/common';
import { CatalogFileRelationResolver } from 'src/resolvers';
import { CatalogFileRelationService } from 'src/services';
import { FileModule } from './file.module';

@Module({
  imports: [FileModule],
  providers: [CatalogFileRelationService, CatalogFileRelationResolver],
  exports: [CatalogFileRelationService],
})
export class CatalogFileRelationModule {}
