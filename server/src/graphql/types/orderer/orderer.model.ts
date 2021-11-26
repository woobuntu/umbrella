import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Orderer {
  id: number;

  name: string;

  phone: string;

  email: string;
}
