import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: string;

  email: string;

  name?: string;

  address?: string;

  accessToken?: string;

  refreshToken?: string;
}
