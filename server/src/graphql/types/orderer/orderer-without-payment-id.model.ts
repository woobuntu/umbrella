import { ObjectType, OmitType } from '@nestjs/graphql';
import { Orderer } from './orderer.model';

@ObjectType()
export class OrdererWithOutPaymentId extends OmitType(Orderer, ['paymentId']) {}
