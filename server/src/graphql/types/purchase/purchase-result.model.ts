import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PurchaseResult {
  // 추후 union...
  state: string;

  redirectUrl?: string;
}
