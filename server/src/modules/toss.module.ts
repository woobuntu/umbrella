import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TossController } from 'src/controllers';
import { TossService } from 'src/services';

@Module({
  imports: [HttpModule],
  providers: [TossService],
  controllers: [TossController],
  exports: [TossService],
})
export class TossModule {}
