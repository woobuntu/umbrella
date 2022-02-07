import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NaverService } from 'src/services';

@Module({
  imports: [HttpModule],
  providers: [NaverService],
  exports: [NaverService],
})
export class NaverModule {}
