import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Career {
  id: number;

  classification: string;

  record: string;

  executiveId: number;
}
