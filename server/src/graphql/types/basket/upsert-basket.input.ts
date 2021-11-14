import { InputType } from '@nestjs/graphql';

@InputType()
export class UpsertBasketInput {
  catalogOptionRelationId: number;

  amount: number;
}
