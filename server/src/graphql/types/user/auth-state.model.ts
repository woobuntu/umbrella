import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthState {
  role: string;

  redirectUrl?: string;
}
