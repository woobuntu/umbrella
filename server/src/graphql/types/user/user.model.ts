import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: string;

  email?: string;

  phone?: string;

  name?: string;

  accessToken?: string;

  refreshToken?: string;
}
