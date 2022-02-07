import { InputType } from '@nestjs/graphql';
import { BasketInfo } from './basket-info.model';

@InputType()
export class SignInInput {
  platform: string;

  code: string;

  state: string;

  basketInfo?: BasketInfo;
}
