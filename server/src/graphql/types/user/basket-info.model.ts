import { InputType } from '@nestjs/graphql';

@InputType()
export class BasketInfo {
  catalogOptionRelationId: number;

  amount: number;
}
