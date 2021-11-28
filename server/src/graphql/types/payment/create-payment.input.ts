import { InputType, OmitType } from '@nestjs/graphql';
import { Payment } from './payment.model';

@InputType()
export class CreatePaymentInput extends OmitType(
  Payment,
  ['id'] as const,
  InputType,
) {}
