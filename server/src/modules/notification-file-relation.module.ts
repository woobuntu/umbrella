import { Module } from '@nestjs/common';
import { NotificationFileRelationResolver } from 'src/resolvers';
import { NotificationFileRelationService } from 'src/services';
import { FileModule } from './file.module';

@Module({
  imports: [FileModule],
  providers: [
    NotificationFileRelationService,
    NotificationFileRelationResolver,
  ],
  exports: [NotificationFileRelationService],
})
export class NotificationFileRelationModule {}
