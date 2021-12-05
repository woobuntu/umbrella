import { Module } from '@nestjs/common';
import { BasketResolver } from 'src/resolvers';
import { BasketService } from 'src/services';
import { CatalogOptionRelationModule } from './catalog-option-relation.module';

@Module({
  imports: [CatalogOptionRelationModule],
  providers: [BasketService, BasketResolver],
  exports: [BasketService],
})
export class BasketModule {}
