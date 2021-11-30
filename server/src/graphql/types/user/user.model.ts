import { ObjectType } from '@nestjs/graphql';
import { UserDeliveryRelation } from '../user-delivery-relation';

@ObjectType()
export class User {
  id: string;

  email?: string;

  phone?: string;

  name?: string;

  accessToken?: string;

  refreshToken?: string;

  // userDeliveryRelations: UserDeliveryRelation[];
}
