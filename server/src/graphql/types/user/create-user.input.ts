import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  email: string;

  name?: string;

  address?: string;

  accessToken: string;

  refreshToken: string;
}
