import { InputType } from '@nestjs/graphql';

@InputType()
export class TossPaymentInput {
  paymentKey: string;
  orderId: string;
  amount: number;
}
