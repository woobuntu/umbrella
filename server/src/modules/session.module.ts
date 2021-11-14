import { Module } from '@nestjs/common';
import { SessionService } from 'src/services';

@Module({
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
