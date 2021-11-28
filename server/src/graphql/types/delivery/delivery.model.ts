import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Delivery {
  id: number;

  name: string;

  phone: string;

  address: string;

  memo?: string;
}
