import { Query, Resolver } from '@nestjs/graphql';
import { Contact } from 'src/graphql/types/contact';
import { ContactService } from 'src/services';

@Resolver((of) => Contact)
export class ContactResolver {
  constructor(private contactService: ContactService) {}

  @Query((returns) => Contact)
  async contact() {
    return this.contactService.contact();
  }
}
