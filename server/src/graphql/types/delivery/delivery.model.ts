import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Delivery {
  paymentId: number;

  name: string;

  phone: string;

  postCode: string;

  address: string;

  detailAddress: string;

  memo?: string;

  numberOfInvoice?: string;
}
