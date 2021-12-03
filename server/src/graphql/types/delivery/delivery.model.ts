import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Delivery {
  id: number;

  name: string;

  phone: string;

  postCode: string;

  address: string;

  detailAddress: string;

  memo?: string;
}
