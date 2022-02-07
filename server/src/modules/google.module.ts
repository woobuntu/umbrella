import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleService } from 'src/services';

@Module({
  imports: [HttpModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
