import { Module } from '@nestjs/common';
import { NotificationResolver } from 'src/resolvers';
import { NotificationService } from 'src/services';
import { FileModule } from './file.module';
import { NotificationFileRelationModule } from './notification-file-relation.module';
import { S3Module } from './s3.module';

@Module({
  imports: [S3Module, FileModule, NotificationFileRelationModule],
  providers: [NotificationService, NotificationResolver],
})
export class NotificationModule {}
