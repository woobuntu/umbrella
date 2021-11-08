import { Module } from '@nestjs/common';
import { BasketResolver } from 'src/resolvers';
import { BasketService } from 'src/services';
import { PrismaModule } from './prisma.module';

@Module({ imports: [PrismaModule], providers: [BasketService, BasketResolver] })
export class BasketModule {}
