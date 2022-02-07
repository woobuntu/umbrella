import { Module } from '@nestjs/common';
import { ProductFileRelationResolver } from 'src/resolvers';
import { ProductFileRelationService } from 'src/services';
import { FileModule } from './file.module';

@Module({
  imports: [FileModule],
  providers: [ProductFileRelationService, ProductFileRelationResolver],
  exports: [ProductFileRelationService],
})
export class ProductFileRelationModule {}
