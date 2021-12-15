import { ObjectType } from '@nestjs/graphql';
import { User } from '../user';

@ObjectType()
export class DefaultDelivery {
  id: number;

  name: string;

  phone: string;

  postCode: string;

  address: string;

  detailAddress: string;

  memo?: string;

  userId: string;

  user: User;
}
