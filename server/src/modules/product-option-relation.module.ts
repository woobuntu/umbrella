import { forwardRef, Module } from '@nestjs/common';
import { ProductOptionRelationResolver } from 'src/resolvers';
import { ProductOptionRelationService } from 'src/services';
import { ProductModule } from './product.module';
import { OptionModule } from './option.module';

@Module({
  imports: [forwardRef(() => ProductModule), OptionModule],
  providers: [ProductOptionRelationService, ProductOptionRelationResolver],
  exports: [ProductOptionRelationService],
})
export class ProductOptionRelationModule {}
