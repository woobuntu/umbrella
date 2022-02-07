import { InputType } from '@nestjs/graphql';

@InputType()
export class UpsertBasketInput {
  productOptionRelationId: number;

  quantity: number;
}
