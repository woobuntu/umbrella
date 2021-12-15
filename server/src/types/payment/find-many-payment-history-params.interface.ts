import { Prisma } from '@prisma/client';
import { FindManyParams } from '../base';

export interface FindManyPaymentHistoryParams extends FindManyParams {
  cursor?: Prisma.PaymentHistoryWhereUniqueInput;
  where?: Prisma.PaymentHistoryWhereInput;
  orderBy?: Prisma.PaymentHistoryOrderByWithRelationInput;
}
