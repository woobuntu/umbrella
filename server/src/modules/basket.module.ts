import { Module } from '@nestjs/common';
import { BasketResolver } from 'src/resolvers';
import { BasketService } from 'src/services';
import { CatalogOptionRelationModule } from './catalog-option-relation.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, CatalogOptionRelationModule],
  providers: [BasketService, BasketResolver],
})
export class BasketModule {}
