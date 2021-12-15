import { Module } from '@nestjs/common';
import { BasketResolver } from 'src/resolvers';
import { BasketService } from 'src/services';
import { ProductOptionRelationModule } from './product-option-relation.module';

@Module({
  imports: [ProductOptionRelationModule],
  providers: [BasketService, BasketResolver],
  exports: [BasketService],
})
export class BasketModule {}
