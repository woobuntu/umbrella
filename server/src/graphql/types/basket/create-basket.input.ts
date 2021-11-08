import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateBasketInput {
  catalogOptionRelationId: number;

  amount: number;
}
