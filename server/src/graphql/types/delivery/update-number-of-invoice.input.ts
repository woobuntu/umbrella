import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateNumberOfInvoiceInput {
  paymentId: number;

  numberOfInvoice: string;
}
