import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  address: string;

  mail: string;

  phone: string;
}
