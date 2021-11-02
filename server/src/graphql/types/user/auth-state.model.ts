import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthState {
  isAuthenticated: boolean;
}
