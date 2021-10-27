import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {
  bank: string;

  number: string;

  holder: string;

  consentGuidance?: string;

  deductionGuidance?: string;
}
