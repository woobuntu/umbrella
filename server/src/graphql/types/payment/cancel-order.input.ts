import { InputType } from '@nestjs/graphql';

@InputType()
export class CancelOrderInput {
  paymentId: number;
  cancelReason: string;
}
