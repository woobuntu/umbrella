import { Module } from '@nestjs/common';
import { PurchaseResolver } from 'src/resolvers';
import { PurchaseService } from 'src/services';
import { ProductOptionRelationModule } from './product-option-relation.module';

@Module({
  imports: [ProductOptionRelationModule],
  providers: [PurchaseService, PurchaseResolver],
  exports: [PurchaseService],
})
export class PurchaseModule {}
