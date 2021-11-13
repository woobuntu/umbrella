import { InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  platform: string;

  code: string;

  state: string;
}
