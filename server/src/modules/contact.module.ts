import { Module } from '@nestjs/common';
import { ContactResolver } from 'src/resolvers';
import { ContactService } from 'src/services';

@Module({
  providers: [ContactService, ContactResolver],
})
export class ContactModule {}
