import { Module } from '@nestjs/common';
import { StaticController } from 'src/controllers';

@Module({
  controllers: [StaticController],
})
export class StaticModule {}
