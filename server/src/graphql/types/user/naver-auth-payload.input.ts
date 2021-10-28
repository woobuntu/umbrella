import { InputType } from '@nestjs/graphql';

@InputType()
export class NaverAuthPayload {
  code: string;

  state: string;
}
