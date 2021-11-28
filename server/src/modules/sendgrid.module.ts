import { Module } from '@nestjs/common';
import { SendgridService } from 'src/services';

@Module({
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
