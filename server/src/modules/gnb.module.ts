import { Module } from '@nestjs/common';
import { GnbResolver } from 'src/resolvers';
import { GnbService } from 'src/services';
import { LnbModule } from './lnb.module';

@Module({
  imports: [LnbModule],
  providers: [GnbService, GnbResolver],
})
export class GnbModule {}
