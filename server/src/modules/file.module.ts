import { Module } from '@nestjs/common';
import { FileService } from 'src/services';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
