import { InputType } from '@nestjs/graphql';

@InputType()
export class TossPaymentsInput {
  paymentKey: string;
  orderId: string;
  amount: number;
}
