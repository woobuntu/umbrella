import { InputType } from '@nestjs/graphql';

@InputType()
export class BasketInfo {
  productOptionRelationId: number;

  quantity: number;
}
