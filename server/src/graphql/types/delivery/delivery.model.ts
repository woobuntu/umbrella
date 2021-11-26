import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Delivery {
  id: number;

  name: string;

  phone: string;

  email: string;

  address: string;

  memo?: string;
}
