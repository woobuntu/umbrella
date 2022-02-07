import { Global, Module } from '@nestjs/common';
import { DayjsService } from 'src/services';

@Global()
@Module({
  providers: [DayjsService],
  exports: [DayjsService],
})
export class DayjsModule {}
