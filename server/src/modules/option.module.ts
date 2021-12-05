import { Module } from '@nestjs/common';
import { OptionService } from 'src/services';

@Module({
  providers: [OptionService],
  exports: [OptionService],
})
export class OptionModule {}
