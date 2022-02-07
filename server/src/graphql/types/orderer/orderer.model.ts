import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Orderer {
  paymentId: number;

  name: string;

  phone: string;

  email: string;
}
