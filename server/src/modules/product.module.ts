import { forwardRef, Module } from '@nestjs/common';
import { ProductResolver } from 'src/resolvers';
import { ProductService } from 'src/services';
import { ProductFileRelationModule } from './product-file-relation.module';
import { ProductOptionRelationModule } from './product-option-relation.module';

@Module({
  imports: [
    ProductFileRelationModule,
    forwardRef(() => ProductOptionRelationModule),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
