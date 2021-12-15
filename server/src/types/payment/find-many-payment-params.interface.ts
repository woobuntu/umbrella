import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyPaymentParams extends FindManyParams {
  cursor?: Prisma.PaymentWhereUniqueInput;
  where?: Prisma.PaymentWhereInput;
  orderBy?: Prisma.PaymentOrderByWithRelationInput;
}
